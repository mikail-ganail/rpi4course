import { AxiosInstance } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, State } from "../types/state.js";
import { OffersList } from "../types/offer.js";
import {
  offersCityList,
  requireAuthorization,
  setError,
  setOffersDataLoadingStatus,
  setUserData,
} from "./action";
import { saveToken, dropToken } from "../services/token";
import { APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from "../const";
import { AuthData, UserData } from "../types/user-data";
import { store } from "./index";

export const clearErrorAction = createAsyncThunk("clearError", () => {
  setTimeout(() => store.dispatch(setError(null)), TIMEOUT_SHOW_ERROR);
});

// ИСПРАВЛЕНО: возвращаем данные и используем правильный тип
export const fetchOffersAction = createAsyncThunk<
  OffersList[], // <-- возвращаем массив офферов
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>("data/fetchOffers", async (_arg, { dispatch, extra: api }) => {
  dispatch(setOffersDataLoadingStatus(true));
  try {
    const { data } = await api.get<any[]>(APIRoute.Offers);

    const adaptedOffers: OffersList[] = data.map((item) => {
      const cityLocation = {
        latitude: item.city?.location?.latitude || item.latitude,
        longitude: item.city?.location?.longitude || item.longitude,
        zoom: 10,
      };
      return {
        id: item.id,
        title: item.title,
        type: item.type,
        price: item.price,
        previewImage: item.previewImage,
        city: {
          name: item.city?.name || item.city,
          location: cityLocation,
        },
        location: cityLocation,
        isFavorite: item.isFavorite,
        isPremium: item.isPremium,
        rating: item.rating,
        // другие поля по необходимости
      };
    });

    dispatch(offersCityList(adaptedOffers));
    return adaptedOffers; // <-- возвращаем данные
  } catch (error) {
    console.error("Failed to fetch offers:", error);
    dispatch(setError("Failed to load offers"));
    throw error; // <-- пробрасываем ошибку для rejected состояния
  } finally {
    dispatch(setOffersDataLoadingStatus(false));
  }
});

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>("user/checkAuth", async (_arg, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<UserData>(APIRoute.Login);
    dispatch(setUserData(data));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  } catch {
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(setUserData(null));
  }
});

export const loginAction = createAsyncThunk<
  UserData,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>("user/login", async ({ email, password }, { dispatch, extra: api }) => {
  const { data } = await api.post<UserData>(APIRoute.Login, {
    email,
    password,
  });
  saveToken(data.token);
  dispatch(setUserData(data));
  dispatch(requireAuthorization(AuthorizationStatus.Auth));
  return data;
});

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>("user/logout", async (_arg, { dispatch, extra: api }) => {
  await api.delete(APIRoute.Logout);
  dropToken();
  dispatch(setUserData(null));
  dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
});
