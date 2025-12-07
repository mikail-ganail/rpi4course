import type { FavoriteOffer, FullOffer } from "../types/offer";
import { offers } from "./offers";

const mapToFavorite = (offer: FullOffer): FavoriteOffer => ({
  id: offer.id,
  cityName: offer.city.name,
  title: offer.title,
  type: offer.type,
  price: offer.price,
  rating: offer.rating,
  isPremium: offer.isPremium,
  image: offer.images[0], // первая картинка как превью
});

export const favoriteOffers: FavoriteOffer[] = offers
  .filter((offer) => offer.isFavorite)
  .map(mapToFavorite);
