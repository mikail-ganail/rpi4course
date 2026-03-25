import { JSX, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppRoute, AuthorizationStatus } from "../../const";
import { MainPage } from "../../pages/main-page/main-page";
import { LoginPage } from "../../pages/login-page/login-page";
import { FavoritesPage } from "../../pages/favorites-page/favorites-page";
import { OfferPage } from "../../pages/offer-page/offer-page";
import { NotFoundPage } from "../../pages/not-found-page/not-found-page";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { LoadingScreen } from "../loading-screen/loading-screen";
import { fetchOffersAction, checkAuthAction } from "../../store/api-actions"; // <-- правильный импорт

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(
    (state) => state.authorizationStatus,
  );
  const isOffersDataLoading = useAppSelector(
    (state) => state.isOffersDataLoading,
  );
  const offers = useAppSelector((state) => state.offers);

  useEffect(() => {
    // Загружаем офферы при монтировании приложения
    dispatch(fetchOffersAction()); // <-- используем правильное имя
    dispatch(checkAuthAction());
  }, [dispatch]);

  if (
    authorizationStatus === AuthorizationStatus.Unknown ||
    isOffersDataLoading
  ) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage />} />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route path={AppRoute.Favorites} element={<FavoritesPage />} />
        <Route path={`${AppRoute.Offer}/:id`} element={<OfferPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export { App };
