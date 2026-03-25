import { AxiosInstance } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, State } from "../types/state.js";
import { FullOffer, OffersList } from "../types/offer.js";
import {
  offersCityList,
  requireAuthorization,
  setError,
  setOffersDataLoadingStatus,
  setUserData,
  setReviews,
  setFullOfferLoading,
  setFullOffer,
} from "./action";
import { saveToken, dropToken } from "../services/token";
import { APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from "../const";
import { AuthData, UserData } from "../types/user-data";
import { store } from "./index";
import { Review } from "../types/review.js";

export const clearErrorAction = createAsyncThunk("clearError", () => {
  setTimeout(() => store.dispatch(setError(null)), TIMEOUT_SHOW_ERROR);
});

export const fetchOffersAction = createAsyncThunk<
  OffersList[],
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
      };
    });

    dispatch(offersCityList(adaptedOffers));
    return adaptedOffers;
  } catch (error) {
    console.error("Failed to fetch offers:", error);
    dispatch(setError("Failed to load offers"));
    throw error;
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

export const fetchFavoritesAction = createAsyncThunk<
  OffersList[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>("data/fetchFavorites", async (_arg, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<OffersList[]>(APIRoute.Favorite);
    dispatch(offersCityList(data));
    return data;
  } catch (error) {
    console.error("Failed to fetch favorites:", error);
    dispatch(setError("Failed to load favorites"));
    throw error;
  }
});

export const toggleFavoriteAction = createAsyncThunk<
  OffersList,
  { offerId: string; status: boolean },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  "data/toggleFavorite",
  async ({ offerId, status }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<OffersList>(
        `${APIRoute.Favorite}/${offerId}/${status}`,
      );
      dispatch(fetchOffersAction());
      return data;
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
      dispatch(setError("Failed to update favorite"));
      throw error;
    }
  },
);

// Только один раз объявляем fetchReviewsAction
export const fetchReviewsAction = createAsyncThunk<
  Review[],
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>("data/fetchReviews", async (offerId, { dispatch, extra: api }) => {
  const { data } = await api.get<Review[]>(`${APIRoute.Comments}/${offerId}`);
  dispatch(setReviews(data));
  return data;
});

// Только один раз объявляем postReviewAction
export const postReviewAction = createAsyncThunk<
  Review,
  { offerId: string; rating: number; comment: string },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  "data/postReview",
  async ({ offerId, rating, comment }, { dispatch, extra: api }) => {
    const { data } = await api.post<Review>(`${APIRoute.Comments}/${offerId}`, {
      rating,
      comment,
    });
    dispatch(fetchReviewsAction(offerId));
    return data;
  },
);

export const fetchFullOfferAction = createAsyncThunk<
  FullOffer,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>("data/fetchFullOffer", async (id, { dispatch, extra: api }) => {
  dispatch(setFullOfferLoading(true));
  try {
    const { data } = await api.get<FullOffer>(`${APIRoute.Offers}/${id}`);
    dispatch(setFullOffer(data));
    return data;
  } catch (error) {
    console.error("Failed to fetch offer:", error);
    dispatch(setFullOffer(null));
    throw error;
  } finally {
    dispatch(setFullOfferLoading(false));
  }
});
