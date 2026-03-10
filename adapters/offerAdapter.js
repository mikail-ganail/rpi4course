// adapters/offerAdapter.js

const cityCoordinates = {
  Paris: { latitude: 48.8566, longitude: 2.3522, zoom: 13 },
  Cologne: { latitude: 50.9375, longitude: 6.9603, zoom: 13 },
  Brussels: { latitude: 50.8503, longitude: 4.3517, zoom: 13 },
  Amsterdam: { latitude: 52.3676, longitude: 4.9041, zoom: 13 },
  Hamburg: { latitude: 53.5511, longitude: 9.9937, zoom: 13 },
  Dusseldorf: { latitude: 51.2277, longitude: 6.7735, zoom: 13 },
};

const getBaseUrl = () => `${process.env.HOST}:${process.env.PORT || 5000}`;

// Адаптер для краткой информации (используется в списке)
const adaptOfferToClient = (offer) => {
  const baseUrl = getBaseUrl();
  const cityLocation = cityCoordinates[offer.city];

  let previewImage = offer.previewImage;
  if (previewImage && !previewImage.startsWith("http")) {
    previewImage = `${baseUrl}${previewImage.startsWith("/") ? "" : "/"}${previewImage}`;
  }

  return {
    id: String(offer.id),
    title: offer.title,
    type: offer.type,
    price: offer.price,
    city: {
      name: offer.city,
      location: cityLocation,
    },
    location:
      offer.latitude && offer.longitude
        ? {
            latitude: offer.latitude,
            longitude: offer.longitude,
          }
        : { latitude: 0, longitude: 0 },
    isFavorite: offer.isFavorite,
    isPremium: offer.isPremium,
    rating: parseFloat(offer.rating),
    previewImage,
  };
};

// Адаптер для полной информации (одно предложение + автор)
const adaptFullOfferToClient = (offer, author) => {
  const baseUrl = getBaseUrl();
  const cityLocation = cityCoordinates[offer.city];

  // Обработка изображений (превью + фотографии)
  let previewImage = offer.previewImage;
  if (previewImage && !previewImage.startsWith("http")) {
    previewImage = `${baseUrl}${previewImage.startsWith("/") ? "" : "/"}${previewImage}`;
  }

  let photos = [];
  if (offer.photos && Array.isArray(offer.photos)) {
    photos = offer.photos.map((photo) => {
      if (photo.startsWith("http")) return photo;
      return `${baseUrl}${photo.startsWith("/") ? "" : "/"}${photo}`;
    });
  }

  // Формирование описания автора
  const authorData = author
    ? {
        id: String(author.id),
        name: author.username,
        avatarUrl: author.avatar
          ? `${baseUrl}${author.avatar.startsWith("/") ? "" : "/"}${author.avatar}`
          : null,
        isPro: author.userType === "pro",
      }
    : null;

  return {
    id: String(offer.id),
    title: offer.title,
    description: offer.description,
    type: offer.type,
    price: offer.price,
    city: {
      name: offer.city,
      location: cityLocation,
    },
    location:
      offer.latitude && offer.longitude
        ? {
            latitude: offer.latitude,
            longitude: offer.longitude,
          }
        : { latitude: 0, longitude: 0 },
    isFavorite: offer.isFavorite,
    isPremium: offer.isPremium,
    rating: parseFloat(offer.rating),
    previewImage,
    photos,
    bedrooms: offer.rooms,
    maxAdults: offer.guests,
    features: offer.features || [],
    host: authorData,
    commentsCount: offer.commentsCount || 0,
  };
};

export { adaptOfferToClient, adaptFullOfferToClient };
