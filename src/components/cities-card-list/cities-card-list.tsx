import { JSX } from "react";
import { CitiesCard } from "../cities-card/cities-card";
import { OffersList } from "../../types/offer";

type CitiesCardListProps = {
  offersList: OffersList[];
  onListItemHover?: (offerId: string | undefined) => void;
  className?: string;
};

function CitiesCardList({
  offersList,
  onListItemHover,
  className = "cities__places-list places__list tabs__content",
}: CitiesCardListProps): JSX.Element {
  return (
    <div className={className}>
      {offersList.map((offer) => (
        <CitiesCard key={offer.id} offer={offer} onHover={onListItemHover} />
      ))}
    </div>
  );
}

export { CitiesCardList };
