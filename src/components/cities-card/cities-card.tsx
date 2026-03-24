import { JSX, MouseEvent } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { OffersList } from "../../types/offer";
import { useAppDispatch } from "../../hooks";
import { toggleFavorite } from "../../store/action";

type CitiesCardProps = {
  offer: OffersList;
  cardType?: "cities" | "favorites" | "near";
  onHover?: (id: string | undefined) => void;
};

function CitiesCard({
  offer,
  cardType = "cities",
  onHover,
}: CitiesCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const {
    id,
    title,
    type,
    price,
    previewImage,
    isFavorite,
    isPremium,
    rating,
  } = offer;
  const ratingWidth = Math.round(rating) * 20 + "%";

  const handleMouseEnter = () => {
    onHover?.(id);
  };

  const handleMouseLeave = () => {
    onHover?.(undefined);
  };

  const handleFavoriteClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(toggleFavorite(id));
  };

  return (
    <article
      className={`${cardType}__card place-card`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${cardType}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width="260"
            height="200"
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={classNames("place-card__bookmark-button", "button", {
              "place-card__bookmark-button--active": isFavorite,
            })}
            type="button"
            onClick={handleFavoriteClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">
              {isFavorite ? "In bookmarks" : "To bookmarks"}
            </span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: ratingWidth }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export { CitiesCard };
