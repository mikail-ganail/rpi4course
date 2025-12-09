import type { JSX } from "react";
import type { OffersList } from "../../types/offer";
import { CitiesCard } from "../cities-card/cities-card";

type NearPlacesListProps = {
  offers: OffersList[];
};

function NearPlacesList({ offers }: NearPlacesListProps): JSX.Element {
  return (
    <section className="near-places places">
      <h2 className="near-places__title">
        Other places in the neighbourhood
      </h2>
      <div className="near-places__list places__list">
        {offers.map((offer) => (
          <CitiesCard
            key={offer.id}
            id={offer.id}
            title={offer.title}
            type={offer.type}
            price={offer.price}
            previewImage={offer.previewImage}
            isPremium={offer.isPremium}
            rating={offer.rating}
          />
        ))}
      </div>
    </section>
  );
}

export { NearPlacesList };
