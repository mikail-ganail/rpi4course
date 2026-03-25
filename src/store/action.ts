import { createAction } from "@reduxjs/toolkit";
import { CityOffer, FullOffer, OffersList } from "../types/offer";
import { AuthorizationStatusType } from "../types/authorization-status";
import { UserData } from "../types/user-data";
import { Review } from "../types/review";

export const changeCity = createAction(
  "offers/changeCity",
  (city: CityOffer) => ({
    payload: city,
  }),
);

export const offersCityList = createAction(
  "offers/offersCityList",
  (offers: OffersList[]) => ({
    payload: offers,
  }),
);

export const toggleFavorite = createAction(
  "offers/toggleFavorite",
  (offerId: string) => ({
    payload: offerId,
  }),
);

export const requireAuthorization = createAction<AuthorizationStatusType>(
  "user/requireAuthorization",
);

export const setError = createAction(
  "data/setError",
  (error: string | null) => ({
    payload: error,
  }),
);

export const setOffersDataLoadingStatus = createAction<boolean>(
  "data/setOffersDataLoadingStatus",
);

export const setUserData = createAction(
  "user/setUserData",
  (userData: UserData | null) => ({
    payload: userData,
  }),
);

export const setReviews = createAction<Review[]>("setReviews");

export const setFullOffer = createAction<FullOffer | null>("setFullOffer");
export const setFullOfferLoading = createAction<boolean>("setFullOfferLoading");
