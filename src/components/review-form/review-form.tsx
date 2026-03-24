import { JSX, useState, ChangeEvent, FormEvent, Fragment } from 'react';

type ReviewFormProps = {
  onSubmit: (rating: number, comment: string) => void;
};

function ReviewForm({ onSubmit }: ReviewFormProps): JSX.Element {
  const [formData, setFormData] = useState({
    rating: 0,
    review: ''
  });

  const handleFieldChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onSubmit(Number(formData.rating), formData.review);
    setFormData({ rating: 0, review: '' });
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((star) => (
          <Fragment key={star}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={star}
              id={`${star}-stars`}
              type="radio"
              onChange={handleFieldChange}
              checked={Number(formData.rating) === Number(star)}
            />
            <label 
                htmlFor={`${star}-stars`} 
                className="reviews__rating-label form__rating-label" 
                title="rating"
                style={{ cursor: 'pointer' }}
            >
              <svg className="form__star-image" width="37" height="33" style={{ pointerEvents: 'none' }}> 
                <use href="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleFieldChange}
        value={formData.review}
      ></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={formData.review.length < 50 || formData.rating === 0}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export { ReviewForm };
