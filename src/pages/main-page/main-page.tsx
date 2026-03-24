import { JSX, useState } from "react";
import { CitiesCardList } from "../../components/cities-card-list/cities-card-list";
import { useAppSelector } from "../../hooks";
import { CitiesList } from "../../components/cities-list/cities-list";
import { getOffersByCity, sortOffersByType } from "../../utils";
import { SortOptions } from "../../components/sort-options/sort-options";
import { SortOffer } from "../../types/sort";
import { SortOffersType } from "../../const";
import { OffersList, FullOffer } from "../../types/offer";
import { Header } from "../../components/header/header";
import { Map } from "../../components/map/map";

function MainPage(): JSX.Element {
  const selectedCity = useAppSelector((state) => state.city);

  const offersList = useAppSelector((state) => state.offers);

  const selectedCityOffers = getOffersByCity(selectedCity?.name, offersList);

  const [activeSort, setActiveSort] = useState<SortOffer>(
    SortOffersType.Popular,
  );
  const [selectedOffer, setSelectedOffer] = useState<
    OffersList | FullOffer | undefined
  >(undefined);

  const sortedOffers = sortOffersByType(selectedCityOffers, activeSort);

  const handleListItemHover = (offerId: string | undefined) => {
    if (!offerId) {
      setSelectedOffer(undefined);
      return;
    }
    const currentOffer = offersList.find((offer) => offer.id === offerId);
    setSelectedOffer(currentOffer);
  };

  return (
    <div className="page page--gray page--main">
      <div style={{ display: "none" }}>
        <svg xmlns="http://www.w3.org/2000/svg">
          <symbol id="icon-arrow-select" viewBox="0 0 7 4">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"
            ></path>
          </symbol>
          <symbol id="icon-bookmark" viewBox="0 0 17 18">
            <path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path>
          </symbol>
          <symbol id="icon-star" viewBox="0 0 13 12">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"
            ></path>
          </symbol>
        </svg>
      </div>

      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList selectedCity={selectedCity} />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {selectedCityOffers.length} places to stay in{" "}
                {selectedCity?.name}
              </b>

              <SortOptions
                activeSorting={activeSort}
                onChange={(newSorting) => setActiveSort(newSorting)}
              />

              <CitiesCardList
                offersList={sortedOffers}
                onListItemHover={handleListItemHover}
              />
            </section>
            <div className="cities__right-section">
              {selectedCity && (
                <Map
                  className="cities__map map"
                  city={selectedCity}
                  points={selectedCityOffers}
                  selectedPoint={selectedOffer}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export { MainPage };
