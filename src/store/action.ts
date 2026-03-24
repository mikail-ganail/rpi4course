// store/action.ts
import { createAction } from "@reduxjs/toolkit";
import { CityOffer, OffersList, FullOffer, Review } from "../types/offer";
import { AuthorizationStatusType } from "../types/authorization-status";
import { UserData } from "../types/user-data";

export const changeCity = createAction<CityOffer | undefined>("changeCity");
export const offersCityList = createAction<OffersList[]>("offersCityList");
export const requireAuthorization = createAction<AuthorizationStatusType>(
  "requireAuthorization",
);
export const setError = createAction<string | null>("setError");
export const setOffersDataLoadingStatus = createAction<boolean>(
  "setOffersDataLoadingStatus",
);
export const setUserData = createAction<UserData | null>("setUserData");

// НОВЫЕ ACTIONS
export const setFullOffer = createAction<FullOffer | null>("setFullOffer");
export const setNearbyOffers = createAction<OffersList[]>("setNearbyOffers");
export const setReviews = createAction<Review[]>("setReviews");
export const setFullOfferLoadingStatus = createAction<boolean>(
  "setFullOfferLoadingStatus",
);

// toggleFavorite (если используется в CitiesCard)
export const toggleFavorite = createAction<string>("toggleFavorite");