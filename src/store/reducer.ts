import { createReducer } from "@reduxjs/toolkit";
import { OffersList, CityOffer, FullOffer } from "../types/offer";
import { getCity } from "../utils";
import {
  changeCity,
  offersCityList,
  requireAuthorization,
  setError,
  setOffersDataLoadingStatus,
  setUserData,
  setReviews,
  setFullOffer,
  setFullOfferLoading,
} from "./action";
import { AuthorizationStatus, CITIES_LOCATION } from "../const";
import { AuthorizationStatusType } from "../types/authorization-status";
import { UserData } from "../types/user-data";
import { Review } from "../types/review";

const defaultCity = getCity("Paris");

export type InitialState = {
  city: CityOffer | undefined;
  offers: OffersList[];
  authorizationStatus: AuthorizationStatusType;
  error: string | null;
  isOffersDataLoading: boolean;
  user: UserData | null;
  reviews: Review[];
  fullOffer: FullOffer | null;
  isFullOfferLoading: boolean;
};

const initialState: InitialState = {
  city: defaultCity,
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  isOffersDataLoading: false,
  user: null,
  reviews: [],
  fullOffer: null,
  isFullOfferLoading: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(offersCityList, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.user = action.payload;
    })
    .addCase(setReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(setFullOffer, (state, action) => {
      state.fullOffer = action.payload;
    })
    .addCase(setFullOfferLoading, (state, action) => {
      state.isFullOfferLoading = action.payload;
    });
});

export { reducer };