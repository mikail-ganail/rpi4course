import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { Header } from "../components/header/header";
import { renderWithProviders } from "./render-with-providers";
import { AuthorizationStatus } from "../const";
import { makeFakeOffer, makeFakeStore } from "./mocks";

const fakeUserInfo = {
  id: "user-1",
  email: "test@example.com",
  username: "Test User",
  name: 'Test User',
  avatarUrl: "https://example.com/avatar.jpg",
  isPro: false,
  token: "fake-token",
};

const fakeOffers = [
  { ...makeFakeOffer(), isFavorite: true, id: "1" },
  { ...makeFakeOffer(), isFavorite: false, id: "2" },
  { ...makeFakeOffer(), isFavorite: true, id: "3" },
];

describe("Header — неавторизованный пользователь", () => {
  it("отображает ссылку Sign in", () => {
    renderWithProviders(
      <Header />,
      makeFakeStore({
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
        offers: [],
      }),
    );
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });

  it("не отображает Sign out", () => {
    renderWithProviders(
      <Header />,
      makeFakeStore({
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
        offers: [],
      }),
    );
    expect(screen.queryByText(/sign out/i)).not.toBeInTheDocument();
  });
});

describe("Header — авторизованный пользователь", () => {
  it("отображает email пользователя", () => {
    renderWithProviders(
      <Header />,
      makeFakeStore({
        authorizationStatus: AuthorizationStatus.Auth,
        user: fakeUserInfo,
        offers: fakeOffers,
      }),
    );
    expect(screen.getByText(fakeUserInfo.email)).toBeInTheDocument();
  });

  it("отображает кнопку Sign out", () => {
    renderWithProviders(
      <Header />,
      makeFakeStore({
        authorizationStatus: AuthorizationStatus.Auth,
        user: fakeUserInfo,
        offers: fakeOffers,
      }),
    );
    expect(screen.getByText(/sign out/i)).toBeInTheDocument();
  });

  it("отображает количество избранных предложений", () => {
    renderWithProviders(
      <Header />,
      makeFakeStore({
        authorizationStatus: AuthorizationStatus.Auth,
        user: fakeUserInfo,
        offers: fakeOffers,
      }),
    );
    const favoriteCount = fakeOffers.filter((offer) => offer.isFavorite).length;
    expect(screen.getByText(favoriteCount.toString())).toBeInTheDocument();
  });

  it("отображает аватар пользователя", () => {
    renderWithProviders(
      <Header />,
      makeFakeStore({
        authorizationStatus: AuthorizationStatus.Auth,
        user: fakeUserInfo,
        offers: fakeOffers,
      }),
    );
    const avatar = screen.getByAltText("User avatar");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute("src", fakeUserInfo.avatarUrl);
  });

  it("отображает правильное количество избранных при пустом списке", () => {
    renderWithProviders(
      <Header />,
      makeFakeStore({
        authorizationStatus: AuthorizationStatus.Auth,
        user: fakeUserInfo,
        offers: [],
      }),
    );
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});
