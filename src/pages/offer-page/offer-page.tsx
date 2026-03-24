import { JSX, useState } from "react";
import { useParams } from "react-router-dom";
import { NotFoundPage } from "../not-found-page/not-found-page";
import { ReviewForm } from "../../components/review-form/review-form";
import { ReviewsList } from "../../components/reviews-list/reviews-list";
import { reviews as initialReviews } from "../../mocks/reviews";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { toggleFavorite } from "../../store/action";
import { Header } from "../../components/header/header";
import { Map } from "../../components/map/map";
import { FullOffer } from "../../types/offer";
import { LoadingScreen } from "../../components/loading-screen/loading-screen";
import { CitiesCard } from "../../components/cities-card/cities-card";

function OfferPage(): JSX.Element {
  const params = useParams();
  const dispatch = useAppDispatch();

  const offers = useAppSelector((state) => state.offers);
  const isOffersDataLoading = useAppSelector(
    (state) => state.isOffersDataLoading,
  );
  const [currentReviews, setCurrentReviews] = useState(initialReviews);

  // Показываем загрузку, если данные еще загружаются
  if (isOffersDataLoading) {
    return <LoadingScreen />;
  }

  // Ищем оффер по id (приводим к строке для корректного сравнения)
  const foundOffer = offers.find((item) => String(item.id) === params.id);

  console.log("params.id:", params.id);
  console.log(
    "offers ids:",
    offers.map((o) => String(o.id)),
  );
  console.log("foundOffer:", foundOffer);

  // Если оффер не найден, показываем 404
  if (!foundOffer) {
    return <NotFoundPage />;
  }

  const offer = foundOffer as unknown as FullOffer;
  const ratingWidth = Math.round(offer.rating) * 20 + "%";
  const nearbyOffers = offers
    .filter((o) => String(o.id) !== String(offer.id))
    .slice(0, 3);
  const mapPoints = [foundOffer, ...nearbyOffers];

  const handleReviewSubmit = (rating: number, comment: string) => {
    const newReview = {
      id: String(Date.now()),
      user: {
        id: "user-999",
        name: "Me",
        avatarUrl: "/img/avatar-max.jpg",
        isPro: false,
      },
      rating,
      comment,
      date: new Date().toISOString(),
    };
    setCurrentReviews([newReview, ...currentReviews]);
  };

  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(offer.id));
  };

  return (
    <div className="page">
      {/* SVG спрайты */}
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

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {(offer.images || [offer.previewImage])
                .slice(0, 6)
                .map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className="offer__image-wrapper"
                  >
                    <img
                      className="offer__image"
                      src={item}
                      alt="Photo studio"
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{offer.title}</h1>
                <button
                  className={`offer__bookmark-button button ${offer.isFavorite ? "offer__bookmark-button--active" : ""}`}
                  type="button"
                  onClick={handleFavoriteClick}
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: ratingWidth }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {offer.rating}
                </span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offer.bedrooms || 3} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offer.maxAdults || 4} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {(offer.goods || []).map((item) => (
                    <li key={item} className="offer__inside-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div
                    className={`offer__avatar-wrapper user__avatar-wrapper ${offer.host?.isPro ? "offer__avatar-wrapper--pro" : ""}`}
                  >
                    <img
                      className="offer__avatar user__avatar"
                      src={offer.host?.avatarUrl || "/img/avatar.svg"}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">
                    {offer.host?.name || "Host"}
                  </span>
                  {offer.host?.isPro && (
                    <span className="offer__user-status">Pro</span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{offer.description || ""}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  Reviews &middot;{" "}
                  <span className="reviews__amount">
                    {currentReviews.length}
                  </span>
                </h2>
                <ReviewsList reviews={currentReviews} />
                <ReviewForm onSubmit={handleReviewSubmit} />
              </section>
            </div>
          </div>
          <Map city={offer.city} points={mapPoints} selectedPoint={offer} />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              {nearbyOffers.map((nearOffer) => (
                <CitiesCard
                  key={nearOffer.id}
                  offer={nearOffer}
                  cardType="near"
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export { OfferPage };
