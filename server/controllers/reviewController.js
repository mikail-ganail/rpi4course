import ApiError from "../../error/ApiError.js";
import { Review } from "../../models/review.js";
import { adaptReviewToClient } from "../../adapters/reviewAdapter.js";
import { User } from "../../models/user.js";

export const addReview = async (req, res, next) => {
  // исправлено: resizeBy -> res
  try {
    const { comment, rating } = req.body;
    const offerId = req.params.offerId;
    const userId = req.user.id;

    console.log("=== Add Review Debug ===");
    console.log("comment:", comment);
    console.log("rating:", rating);
    console.log("rating type:", typeof rating);
    console.log("offerId:", offerId);
    console.log("userId:", userId);

    // Проверяем наличие всех данных
    if (!comment || !rating || !offerId) {
      console.log("Missing data:", { comment, rating, offerId });
      return next(ApiError.badRequest("Не хватает данных для комментария"));
    }

    // Проверяем длину комментария
    if (comment.length < 5) {
      return next(
        ApiError.badRequest("Комментарий должен быть не менее 5 символов"),
      );
    }

    if (comment.length > 1024) {
      return next(
        ApiError.badRequest("Комментарий должен быть не более 1024 символов"),
      );
    }

    // Проверяем рейтинг
    const ratingNum = Number(rating);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return next(ApiError.badRequest("Рейтинг должен быть от 1 до 5"));
    }

    const review = await Review.create({
      text: comment,
      rating: ratingNum,
      authorId: userId,
      OfferId: offerId,
    });

    console.log("Review created successfully:", review.id);

    // Возвращаем созданный отзыв с информацией об авторе
    const reviewWithAuthor = await Review.findByPk(review.id, {
      include: { model: User, as: "author" },
    });

    const adaptedReview = adaptReviewToClient(reviewWithAuthor);
    res.status(201).json(adaptedReview);
  } catch (error) {
    console.error("Error adding review:", error);
    next(
      ApiError.badRequest(
        "Ошибка при добавлении комментариев: " + error.message,
      ),
    );
  }
};

export const getReviewsByOfferId = async (req, res, next) => {
  try {
    const { offerId } = req.params;
    console.log("Fetching reviews for offerId:", offerId);

    const reviews = await Review.findAll({
      where: { OfferId: offerId },
      include: { model: User, as: "author" },
      order: [["publishDate", "DESC"]],
    });

    console.log(`Found ${reviews.length} reviews`);

    const adaptedReviews = reviews.map(adaptReviewToClient);
    res.json(adaptedReviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    next(
      ApiError.internal("Ошибка при получении комментариев: " + error.message),
    );
  }
};
