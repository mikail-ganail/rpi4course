import type { JSX } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import type { OffersList } from "../../types/offer";

type MapProps = {
  offers: OffersList[];
};

const defaultIcon = L.icon({
  iconUrl: "/img/pin.svg",
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

function Map({ offers }: MapProps): JSX.Element {
  console.log(offers)
  const city = offers[0].city; // все офферы из одного города

  return (
    <MapContainer
      center={[city.location.latitude, city.location.longitude]}
      zoom={city.location.zoom}
      className="cities__map map"
      style={{ height: '400px' }}
      scrollWheelZoom
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {offers.map((offer) => (
        <Marker
          key={offer.id}
          position={[offer.location.latitude, offer.location.longitude]}
          icon={defaultIcon}
        />
      ))}
    </MapContainer>
  );
}

export { Map };
