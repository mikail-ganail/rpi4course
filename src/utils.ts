
import { CityOffer, OffersList } from './types/offer';
import { CITIES_LOCATION, SortOffersType } from './const';
import { SortOffer } from './types/sort';

export function getCity(cityName: string): CityOffer {
  const city = CITIES_LOCATION.find((c) => c.name === cityName);
  if (!city) {

     return CITIES_LOCATION[0]; 
  }
  return city;
}

export function getOffersByCity(cityName: string | undefined, offers: OffersList[]): OffersList[] {
    if (!cityName) return [];
    return offers.filter((offer) => offer.city.name === cityName);
}

export function sortOffersByType(offers: OffersList[], type: SortOffer): OffersList[] {

    const sortedOffers = [...offers]; 
    
    switch (type) {
        case SortOffersType.PriceToHigh:
            return sortedOffers.sort((a, b) => a.price - b.price);
        case SortOffersType.PriceToLow:
            return sortedOffers.sort((a, b) => b.price - a.price);
        case SortOffersType.TopRated:
            return sortedOffers.sort((a, b) => b.rating - a.rating);
        default:
            return sortedOffers;
    }
}
