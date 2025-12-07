import type { JSX } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AppRoute, AuthorizationStatus } from "../../const";
import { MainPage } from "../../pages/main-page/main-page";
import { LoginPage } from "../../pages/login/login";
import { FavoritesPage } from "../../pages/favorites/favorites";
import { OfferPage } from "../../pages/offer/offer";
import { NotFoundPage } from "../../pages/error/404";
import { PrivateRoute } from "../private-route/private-route";
import type { FullOffer, OffersList } from "../../types/offer";
import { favoriteOffers } from "../../mocks/favorites";

type AppMainPageProps = {
  rentalOffersCount: number;
  offersList: OffersList[];
  offers: FullOffer[];
};

function App({
  rentalOffersCount,
  offersList,
  offers,
}: AppMainPageProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <MainPage
              rentalOffersCount={rentalOffersCount}
              offersList={offersList}
            />
          }
        />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <FavoritesPage offers={favoriteOffers} />
            </PrivateRoute>
          }
        />

        <Route
          path={`${AppRoute.Offer}/:id`}
          element={<OfferPage offers={offers} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export { App };
