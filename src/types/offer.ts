export type OfferLocation = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type CityOffer = {
  name: string;
  location: OfferLocation;
};

export type HostOffer = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type FullOffer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: CityOffer;
  location: OfferLocation;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  features: string[];
  host: HostOffer;
  photos: string[];
  maxAdults: number;
  previewImage: string;
};

export type OffersList = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: CityOffer;
  location: OfferLocation;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};

export type Review = {
  id: string;
  comment: string;
  rating: number;
  date: string;
  user: ReviewUser;
};

export type ReviewUser = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};