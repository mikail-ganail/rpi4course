import type { FullOffer } from "../types/offer";

const offers: FullOffer[] = [
  {
    id: "bbb060ae-3f92-446d-9a68-cb64b5d38e2b",
    title: "Elegant studio in the heart of Paris",
    type: "apartment",
    price: 120,
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
    description:
      "Cozy studio with a balcony and a view of the old city streets, perfect for a weekend in Paris.",
    bedrooms: 1,
    goods: ["Wi-Fi", "Heating", "Kitchen", "Coffee machine", "Washer"],
    host: {
      name: "Clément",
      avatarUrl: "/img/avatar.svg",
      isPro: true,
    },
    images: ["/img/hotels/paris.png"],
    maxAdults: 2,
  },

  {
    id: "offer-cologne-1",
    title: "Riverside apartment with cathedral view",
    type: "apartment",
    price: 90,
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
    description:
      "Bright apartment near the Rhine promenade with a view of the cathedral and quick access to the city center.",
    bedrooms: 2,
    goods: ["Wi-Fi", "Towels", "Dishwasher", "Air conditioning"],
    host: {
      name: "Laura",
      avatarUrl: "/img/avatar.svg",
      isPro: false,
    },
    images: ["/img/hotels/cologne.png"],
    maxAdults: 4,
  },

  {
    id: "offer-brussels-1",
    title: "Loft near Grand Place",
    type: "apartment",
    price: 150,
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
    description:
      "Spacious loft with high ceilings and modern interior just a few minutes away from Grand Place.",
    bedrooms: 3,
    goods: [
      "Wi-Fi",
      "Breakfast",
      "Laptop friendly workspace",
      "Washer",
      "Fridge",
    ],
    host: {
      name: "Marie",
      avatarUrl: "/img/avatar.svg",
      isPro: true,
    },
    images: ["/img/hotels/brussels.png"],
    maxAdults: 5,
  },

  {
    id: "offer-amsterdam-1",
    title: "Canal view apartment in Amsterdam",
    type: "apartment",
    price: 200,
    city: {
      name: "Amsterdam",
      location: {
        latitude: 52.3909553943508,
        longitude: 4.85309666406198,
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
    description:
      "Warm and cozy apartment with large windows, overlooking one of the central canals of Amsterdam.",
    bedrooms: 2,
    goods: ["Wi-Fi", "Kitchen", "Washer", "Towels", "Coffee machine"],
    host: {
      name: "Angelina",
      avatarUrl: "/img/avatar.svg",
      isPro: true,
    },
    images: ["/img/hotels/amsterdam.png"],
    maxAdults: 3,
  },

  {
    id: "offer-amsterdam-2",
    title: "Modern loft near Vondelpark",
    type: "apartment",
    price: 150,
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
    description:
      "Bright modern loft within walking distance from Vondelpark, perfect for weekend trips.",
    bedrooms: 1,
    goods: ["Wi-Fi", "Heating", "Kitchen", "Dishwasher"],
    host: {
      name: "Thomas",
      avatarUrl: "/img/avatar.svg",
      isPro: false,
    },
    images: ["/img/hotels/amsterdam-1.png"],
    maxAdults: 2,
  },

  {
    id: "offer-amsterdam-3",
    title: "Cozy studio in historic center",
    type: "studio",
    price: 110,
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
    description:
      "Small but cozy studio located in a quiet street of the historic center.",
    bedrooms: 1,
    goods: ["Wi-Fi", "Towels", "Coffee machine"],
    host: {
      name: "Eva",
      avatarUrl: "/img/avatar.svg",
      isPro: true,
    },
    images: ["/img/hotels/amsterdam-2.png"],
    maxAdults: 2,
  },

  {
    id: "offer-amsterdam-4",
    title: "Spacious family apartment with canal view",
    type: "apartment",
    price: 230,
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
    description:
      "Large family apartment with two bedrooms and panoramic canal views.",
    bedrooms: 2,
    goods: ["Wi-Fi", "Kitchen", "Washer", "Baby seat", "Fridge"],
    host: {
      name: "Martijn",
      avatarUrl: "/img/avatar.svg",
      isPro: true,
    },
    images: ["/img/hotels/amsterdam-3.png"],
    maxAdults: 4,
  },
  
];

export { offers };
