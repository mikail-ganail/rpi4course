import { JSX, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { ReviewForm } from "../../components/review-form/review-form";
import { ReviewsList } from "../../components/reviews-list/reviews-list";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  fetchFullOfferAction,
  toggleFavoriteAction,
  fetchReviewsAction,
  postReviewAction,
} from "../../store/api-actions";
import { Header } from "../../components/header/header";
import { Map } from "../../components/map/map";
import { LoadingScreen } from "../../components/loading-screen/loading-screen";
import { CitiesCard } from "../../components/cities-card/cities-card";
import { AuthorizationStatus } from "../../const";
import { getImageUrl } from "../../utils/api";

function OfferPage(): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const fullOffer = useAppSelector((state) => state.fullOffer);
  const offers = useAppSelector((state) => state.offers);
  const reviews = useAppSelector((state) => state.reviews);
  const isLoading = useAppSelector((state) => state.isFullOfferLoading);
  const authorizationStatus = useAppSelector(
    (state) => state.authorizationStatus,
  );

  useEffect(() => {
    console.log("useEffect сработал, id:", id);
    if (id) {
      console.log("Вызываю fetchFullOfferAction для id:", id);
      dispatch(fetchFullOfferAction(id));
      dispatch(fetchReviewsAction(id));
    } else {
      console.log("id нет");
    }
  }, [dispatch, id]);

  console.log("=== OfferPage Debug ===");
  console.log("id из URL:", id);
  console.log("fullOffer из store:", fullOffer);
  console.log("isLoading:", isLoading);
  console.log("offers в store:", offers.length);

  // Сначала проверяем, есть ли id
  if (!id) {
    return <Navigate to="/404" replace />;
  }

  // Если загрузка не началась и fullOffer null - начинаем загрузку
  if (!isLoading && !fullOffer) {
    return <LoadingScreen />; // или просто показываем загрузку
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!fullOffer) {
    return <Navigate to="/404" replace />;
  }

  const ratingWidth = Math.round(fullOffer.rating) * 20 + "%";
  const nearbyOffers = offers
    .filter((o) => String(o.id) !== String(fullOffer.id))
    .slice(0, 3);
  const mapPoints = [fullOffer, ...nearbyOffers];

  const handleReviewSubmit = (rating: number, comment: string) => {
    if (id) {
      dispatch(postReviewAction({ offerId: id, rating, comment }));
    }
  };

  const handleFavoriteClick = () => {
    dispatch(
      toggleFavoriteAction({
        offerId: fullOffer.id,
        status: !fullOffer.isFavorite,
      }),
    );
  };

  return (
    <div className="page">
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
              {(fullOffer.photos && fullOffer.photos.length > 0
                ? fullOffer.photos
                : []
              )
                .slice(0, 6)
                .map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className="offer__image-wrapper"
                  >
                    <img
                      className="offer__image"
                      src={getImageUrl(item)}
                      alt="Photo studio"
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {fullOffer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{fullOffer.title}</h1>
                <button
                  className={`offer__bookmark-button button ${fullOffer.isFavorite ? "offer__bookmark-button--active" : ""}`}
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
                  {fullOffer.rating}
                </span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {fullOffer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {fullOffer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {fullOffer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{fullOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {(fullOffer.features || []).map((item) => (
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
                    className={`offer__avatar-wrapper user__avatar-wrapper ${fullOffer.host?.isPro ? "offer__avatar-wrapper--pro" : ""}`}
                  >
                    <img
                      className="offer__avatar user__avatar"
                      src={
                        getImageUrl(fullOffer.host?.avatarUrl) ||
                        "/img/avatar.svg"
                      }
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">
                    {fullOffer.host?.name || "Host"}
                  </span>
                  {fullOffer.host?.isPro && (
                    <span className="offer__user-status">Pro</span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{fullOffer.description || ""}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  Reviews &middot;{" "}
                  <span className="reviews__amount">{reviews.length}</span>
                </h2>
                <ReviewsList reviews={reviews} />
                {authorizationStatus === AuthorizationStatus.Auth && (
                  <ReviewForm onSubmit={handleReviewSubmit} />
                )}
              </section>
            </div>
          </div>
          <Map
            city={fullOffer.city}
            points={mapPoints}
            selectedPoint={fullOffer}
          />
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
