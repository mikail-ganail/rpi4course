import type { JSX } from "react";
import type { FavoriteOffer } from "../../types/offer";
import { FavoriteCard } from "../favorite-card/favorite-card";

type FavoriteCardListProps = {
  offers: FavoriteOffer[];
};

function FavoriteCardList({ offers }: FavoriteCardListProps): JSX.Element {
  const grouped = offers.reduce<Record<string, FavoriteOffer[]>>((acc, offer) => {
    if (!acc[offer.cityName]) {
      acc[offer.cityName] = [];
    }
    acc[offer.cityName].push(offer);
    return acc;
  }, {});

  return (
    <ul className="favorites__list">
      {Object.entries(grouped).map(([cityName, cityOffers]) => (
        <li key={cityName} className="favorites__locations-items">
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>{cityName}</span>
              </a>
            </div>
          </div>

          <div className="favorites__places">
            {cityOffers.map((offer) => (
              <FavoriteCard key={offer.id} offer={offer} />
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}

export { FavoriteCardList };
