import type { OffersList } from "../types/offer";

export const offersList: OffersList[] = [
  {
    id: "bbb060ae-3f92-446d-9a68-cb64b5d38e2b",
    title: "Elegant studio in the heart of Paris",
    type: "apartment",
    price: 120,
    previewImage: "/img/hotels/paris.png",
    city: {
      name: "Paris",
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13,
      },
    },
    location: {
      latitude: 48.857,
      longitude: 2.354,
      zoom: 16,
    },
    isFavorite: true,
    isPremium: true,
    rating: 4.9,
  },

  {
    id: "offer-cologne-1",
    title: "Riverside apartment with cathedral view",
    type: "apartment",
    price: 90,
    previewImage: "/img/hotels/cologne.png",
    city: {
      name: "Cologne",
      location: {
        latitude: 50.938361,
        longitude: 6.959974,
        zoom: 13,
      },
    },
    location: {
      latitude: 50.939,
      longitude: 6.96,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.3,
  },

  {
    id: "offer-brussels-1",
    title: "Loft near Grand Place",
    type: "apartment",
    price: 150,
    previewImage: "/img/hotels/brussels.png",
    city: {
      name: "Brussels",
      location: {
        latitude: 50.846557,
        longitude: 4.351697,
        zoom: 13,
      },
    },
    location: {
      latitude: 50.847,
      longitude: 4.352,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.7,
  },

  {
    id: "offer-amsterdam-1",
    title: "Canal view apartment in Amsterdam",
    type: "apartment",
    price: 200,
    previewImage: "/img/hotels/amsterdam.png",
    city: {
      name: "Amsterdam",
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13,
      },
    },
    location: {
      latitude: 52.375,
      longitude: 4.899,
      zoom: 16,
    },
    isFavorite: true,
    isPremium: false,
    rating: 4.8,
  },
  {
    id: "offer-amsterdam-2",
    title: "Modern loft near Vondelpark",
    type: "apartment",
    price: 150,
    previewImage: "/img/hotels/amsterdam-1.png",
    city: {
      name: "Amsterdam",
      location: {
        latitude: 52.3909553943508,
        longitude: 4.85309666406198,
        zoom: 13,
      },
    },
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.6,
  },

  {
    id: "offer-amsterdam-3",
    title: "Cozy studio in historic center",
    type: "studio",
    price: 110,
    previewImage: "/img/hotels/amsterdam-2.png",
    city: {
      name: "Amsterdam",
      location: {
        latitude: 52.3909553943508,
        longitude: 4.85309666406198,
        zoom: 13,
      },
    },
    location: {
      latitude: 52.3619553943508,
      longitude: 4.85409666406198,
      zoom: 16,
    },
    isFavorite: true,
    isPremium: false,
    rating: 4.4,
  },

  {
    id: "offer-amsterdam-4",
    title: "Spacious family apartment with canal view",
    type: "apartment",
    price: 230,
    previewImage: "/img/hotels/amsterdam-3.png",
    city: {
      name: "Amsterdam",
      location: {
        latitude: 52.3909553943508,
        longitude: 4.85309666406198,
        zoom: 13,
      },
    },
    location: {
      latitude: 52.3629553943508,
      longitude: 4.85209666406198,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.9,
  },
];
