import { JSX } from "react";

function FormRatingInput(): JSX.Element{
    return(
        <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio">
                    <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
                      <svg className="form__star-image" width="37" height="33">
                        <use href="#icon-star"></use>
                      </svg>
                    </label>
        </input>
    )
}

export { FormRatingInput };