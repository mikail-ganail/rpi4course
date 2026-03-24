import { createReducer } from '@reduxjs/toolkit';
import { OffersList, CityOffer } from '../types/offer';
import { getCity } from '../utils';
import { changeCity, offersCityList, requireAuthorization, setError, setOffersDataLoadingStatus, setUserData } from './action';
import { AuthorizationStatus, CITIES_LOCATION } from '../const';
import { AuthorizationStatusType } from '../types/authorization-status';
import { UserData } from '../types/user-data';

const defaultCity = getCity('Paris');

export type InitialState = {
    city: CityOffer | undefined;
    offers: OffersList[];
    authorizationStatus: AuthorizationStatusType;
    error: string | null;
    isOffersDataLoading: boolean;
    user: UserData | null;
}

const initialState: InitialState = {
    city: defaultCity,
    offers: [],
    authorizationStatus: AuthorizationStatus.Unknown,
    error: null,
    isOffersDataLoading: false,
    user: null,
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
    });
});

export { reducer };
