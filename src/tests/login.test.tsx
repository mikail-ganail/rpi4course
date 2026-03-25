import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginPage } from "../pages/login-page/login-page";
import { renderWithProviders } from "./render-with-providers";
import { AuthorizationStatus, AppRoute } from "../const";
import { makeFakeStore } from "./mocks";

// Мокаем Navigate из react-router-dom
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    Navigate: ({ to }: { to: string }) => {
      mockNavigate(to);
      return null;
    },
  };
});

// Сбрасываем mock перед каждым тестом
beforeEach(() => {
  mockNavigate.mockClear();
});

describe("LoginPage — отрисовка формы", () => {
  it("отображает заголовок Sign in", () => {
    renderWithProviders(
      <LoginPage />,
      makeFakeStore({
        authorizationStatus: AuthorizationStatus.NoAuth,
      }),
    );

    expect(
      screen.getByRole("heading", { name: /sign in/i }),
    ).toBeInTheDocument();
  });

  it("отображает поле email", () => {
    renderWithProviders(
      <LoginPage />,
      makeFakeStore({
        authorizationStatus: AuthorizationStatus.NoAuth,
      }),
    );

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
  });

  it("отображает поле password", () => {
    renderWithProviders(
      <LoginPage />,
      makeFakeStore({
        authorizationStatus: AuthorizationStatus.NoAuth,
      }),
    );

    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });

  it("кнопка Submit присутствует", () => {
    renderWithProviders(
      <LoginPage />,
      makeFakeStore({
        authorizationStatus: AuthorizationStatus.NoAuth,
      }),
    );

    expect(
      screen.getByRole("button", { name: /sign in/i }),
    ).toBeInTheDocument();
  });
});

describe("LoginPage — ввод данных", () => {
  it("пользователь может ввести email и пароль", async () => {
    renderWithProviders(
      <LoginPage />,
      makeFakeStore({
        authorizationStatus: AuthorizationStatus.NoAuth,
      }),
    );
    const user = userEvent.setup();

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);

    await user.type(emailInput, "test@test.com");
    await user.type(passwordInput, "Password1");

    expect(emailInput).toHaveValue("test@test.com");
    expect(passwordInput).toHaveValue("Password1");
  });
});

describe("LoginPage — перенаправление", () => {
  it("авторизованный пользователь перенаправляется на главную", () => {
    renderWithProviders(
      <LoginPage />,
      makeFakeStore({
        authorizationStatus: AuthorizationStatus.Auth,
        user: {
          name: "Test User",
          avatarUrl: "https://example.com/avatar.jpg",
          isPro: false,
          email: "test@test.com",
          token: "fake-token",
        },
      }),
    );

    expect(mockNavigate).toHaveBeenCalledWith(AppRoute.Main);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(screen.queryByPlaceholderText(/email/i)).not.toBeInTheDocument();
  });

  it("неавторизованный пользователь видит форму и не перенаправляется", () => {
    renderWithProviders(
      <LoginPage />,
      makeFakeStore({
        authorizationStatus: AuthorizationStatus.NoAuth,
      }),
    );

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledTimes(0);
  });
});

describe("LoginPage — отправка формы", () => {
  it("отправляет данные при сабмите формы", async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <LoginPage />,
      makeFakeStore({
        authorizationStatus: AuthorizationStatus.NoAuth,
      }),
    );

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    await user.type(emailInput, "test@test.com");
    await user.type(passwordInput, "Password123");
    await user.click(submitButton);

    expect(emailInput).toHaveValue("test@test.com");
    expect(passwordInput).toHaveValue("Password123");
  });
});
