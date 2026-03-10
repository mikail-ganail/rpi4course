import bcrypt from "bcrypt";
import ApiError from "../../error/ApiError.js";
import { User } from "../../models/user.js";

export const registration = async (req, res, next) => {
  try {
    const { email, password, userType, username } = req.body;

    if (!email || !password) {
      return next(ApiError.badRequest("Некорректный email или password"));
    }
    if (!username || !userType) {
      return next(ApiError.badRequest("Не указаны username или userType"));
    }
    if (!["normal", "pro"].includes(userType)) {
      return next(ApiError.badRequest("Недопустимое значение userType"));
    }

    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(
        ApiError.badRequest("Пользователь с таким email уже существует"),
      );
    }

    const avatarImage = req.file ? `/static/${req.file.filename}` : null;

    const hashPassword = await bcrypt.hash(password, 5);

    const user = await User.create({
      email,
      userType,
      username,
      avatar: avatarImage,
      password: hashPassword,
    });

    res.json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        avatarUrl: user.avatar,
        isPro: user.userType === "pro",
      },
    });
  } catch (error) {
    console.error(error); // для отладки
    next(ApiError.internal("Ошибка регистрации"));
  }
};
