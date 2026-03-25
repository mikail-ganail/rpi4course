import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { CitiesCard } from '../components/cities-card/cities-card';
import { makeFakeOffer } from './mocks';
import { reducer } from '../store/reducer';
import { CITIES_LOCATION, AuthorizationStatus } from '../const';

describe('CitiesCard', () => {
  const createMockStore = () => {
    return configureStore({
      reducer,
      preloadedState: {
        city: CITIES_LOCATION[0],
        offers: [],
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
        error: null,
        isOffersDataLoading: false,
      },
    });
  };

  const renderCard = (offer: any, cardType: 'cities' | 'favorites' | 'near' = 'cities', onHover?: (id: string | undefined) => void) => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CitiesCard offer={offer} cardType={cardType} onHover={onHover} />
        </BrowserRouter>
      </Provider>
    );
  };

  it('заголовок объявления отображается на карточке', () => {
    const fakeOffer = makeFakeOffer();
    renderCard(fakeOffer);
    
    expect(screen.getByText(fakeOffer.title)).toBeInTheDocument();
  });

  it('цена объявления присутствует в разметке', () => {
    const fakeOffer = makeFakeOffer();
    renderCard(fakeOffer);
    
    expect(screen.getByText(`€${fakeOffer.price}`)).toBeInTheDocument();
    expect(screen.getByText(/night/i)).toBeInTheDocument();
  });

  it('метка "Premium" отображается когда isPremium = true', () => {
    const fakeOffer = { ...makeFakeOffer(), isPremium: true };
    renderCard(fakeOffer);
    
    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('метка "Premium" отсутствует когда isPremium = false', () => {
    const fakeOffer = { ...makeFakeOffer(), isPremium: false };
    renderCard(fakeOffer);
    
    expect(screen.queryByText('Premium')).not.toBeInTheDocument();
  });

  it('ссылка на страницу объявления содержит id в href (/offer/id)', () => {
    const fakeOffer = makeFakeOffer();
    renderCard(fakeOffer);
    
    const link = screen.getByRole('link', { name: fakeOffer.title });
    expect(link).toHaveAttribute('href', `/offer/${fakeOffer.id}`);
  });

  it('отображает рейтинг в виде звезд', () => {
    const fakeOffer = { ...makeFakeOffer(), rating: 4 };
    renderCard(fakeOffer);
    
    const ratingStars = document.querySelector('.place-card__stars span');
    expect(ratingStars).toBeInTheDocument();
    expect(ratingStars).toHaveStyle({ width: '80%' });
  });

  it('отображает тип жилья', () => {
    const fakeOffer = makeFakeOffer();
    renderCard(fakeOffer);
    
    expect(screen.getByText(fakeOffer.type)).toBeInTheDocument();
  });

  it('кнопка избранного присутствует', () => {
    const fakeOffer = makeFakeOffer();
    renderCard(fakeOffer);
    
    const bookmarkButton = screen.getByRole('button');
    expect(bookmarkButton).toBeInTheDocument();
    expect(bookmarkButton).toHaveClass('place-card__bookmark-button');
  });

  it('кнопка избранного имеет активный класс когда isFavorite = true', () => {
    const fakeOffer = { ...makeFakeOffer(), isFavorite: true };
    renderCard(fakeOffer);
    
    const bookmarkButton = screen.getByRole('button');
    expect(bookmarkButton).toHaveClass('place-card__bookmark-button--active');
  });

  it('кнопка избранного не имеет активный класс когда isFavorite = false', () => {
    const fakeOffer = { ...makeFakeOffer(), isFavorite: false };
    renderCard(fakeOffer);
    
    const bookmarkButton = screen.getByRole('button');
    expect(bookmarkButton).not.toHaveClass('place-card__bookmark-button--active');
  });

  it('вызывает onHover при наведении мыши', () => {
    const onHover = vi.fn();
    const fakeOffer = makeFakeOffer();
    renderCard(fakeOffer, 'cities', onHover);
    
    const card = screen.getByRole('article');
    fireEvent.mouseEnter(card);
    
    expect(onHover).toHaveBeenCalledWith(fakeOffer.id);
  });

  it('вызывает onHover с undefined при уходе мыши', () => {
    const onHover = vi.fn();
    const fakeOffer = makeFakeOffer();
    renderCard(fakeOffer, 'cities', onHover);
    
    const card = screen.getByRole('article');
    fireEvent.mouseEnter(card);
    fireEvent.mouseLeave(card);
    
    expect(onHover).toHaveBeenCalledWith(undefined);
  });

  it('отображает изображение с правильным src', () => {
    const fakeOffer = makeFakeOffer();
    renderCard(fakeOffer);
    
    const image = screen.getByAltText('Place image');
    expect(image).toHaveAttribute('src', fakeOffer.previewImage);
  });

  it('применяет правильный класс для разных cardType', () => {
    const fakeOffer = makeFakeOffer();
    const store = createMockStore();
    
    const { rerender } = render(
      <Provider store={store}>
        <BrowserRouter>
          <CitiesCard offer={fakeOffer} cardType="favorites" />
        </BrowserRouter>
      </Provider>
    );
    
    let card = screen.getByRole('article');
    expect(card).toHaveClass('favorites__card');
    
    rerender(
      <Provider store={store}>
        <BrowserRouter>
          <CitiesCard offer={fakeOffer} cardType="near" />
        </BrowserRouter>
      </Provider>
    );
    
    card = screen.getByRole('article');
    expect(card).toHaveClass('near__card');
  });
});