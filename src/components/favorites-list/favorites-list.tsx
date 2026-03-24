
import { JSX } from 'react';
import { FullOffer } from '../../types/offer';
import { FavoritesCard } from '../favorites-card/favorites-card';

type FavoritesListProps = {
  offers: FullOffer[];
}

function FavoritesList({ offers }: FavoritesListProps): JSX.Element {
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);
  
  const cities = Array.from(new Set(favoriteOffers.map((offer) => offer.city.name)));

  if (favoriteOffers.length === 0) {
    return (
       <section className="favorites favorites--empty">
          <h1 className="visually-hidden">Favorites (empty)</h1>
          <div className="favorites__status-wrapper">
            <b className="favorites__status">Nothing yet saved.</b>
            <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
          </div>
       </section>
    );
  }

  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {cities.map((cityName) => (
          <li key={cityName} className="favorites__locations-items">
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>{cityName}</span>
                </a>
              </div>
            </div>
            <div className="favorites__places">
              {favoriteOffers
                .filter((offer) => offer.city.name === cityName)
                .map((offer) => (
                  <FavoritesCard key={offer.id} offer={offer} />
                ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export { FavoritesList };
