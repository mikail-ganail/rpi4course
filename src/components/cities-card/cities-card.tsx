import { JSX, MouseEvent } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { OffersList } from "../../types/offer";
import { useAppDispatch } from "../../hooks";
import { toggleFavoriteAction } from "../../store/api-actions";
import { getImageUrl } from "../../utils/api";

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
    evt.stopPropagation();
    dispatch(
      toggleFavoriteAction({
        offerId: id,
        status: !isFavorite,
      }),
    );
  };

  // Общие стили для контейнера изображения
  const imageWrapperStyle = {
    width: "200px",
    height: "150px",
    overflow: "hidden" as const,
    borderRadius: "12px",
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
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
      <div
        className={`${cardType}__image-wrapper place-card__image-wrapper`}
        style={imageWrapperStyle}
      >
        <Link to={`/offer/${id}`}>
          <img
            className="place-card__image"
            src={getImageUrl(previewImage)}
            alt="Place image"
            style={imageStyle}
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
            onClick={handleFavoriteClick}
            style={{
              marginLeft: "10px",
              background: "none",
              border: "none",
              fontSize: "18px",
              cursor: "pointer",
              color: isFavorite ? "#4481c3" : "#757575",
            }}
          >
            {isFavorite ? "★" : "☆"}
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
