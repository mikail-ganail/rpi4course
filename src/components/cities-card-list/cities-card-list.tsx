import type { JSX } from "react";
import type { OffersList } from "../../types/offer";
import { CitiesCard } from "../cities-card/cities-card";

type CitiesCardListProps = {
  offersList: OffersList[];
};

function CitiesCardList({ offersList }: CitiesCardListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offersList.map((item) => (
        <CitiesCard
          key={item.id}
          id={item.id}
          title={item.title}
          type={item.type}
          price={item.price}
          previewImage={item.previewImage}
          isPremium={item.isPremium}
          rating={item.rating}
        />
      ))}
    </div>
  );
}

export { CitiesCardList };
