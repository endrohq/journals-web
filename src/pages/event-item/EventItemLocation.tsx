import { FC } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { LatLng } from 'leaflet';

interface Props {
  longitude: string;
  latitude: string;
}

export const EventItemLocation: FC<Props> = ({ longitude, latitude }) => {
  const latLong = new LatLng(Number(latitude), Number(longitude));
  return (
    <div className="mb25 w100">
      <div className="mb15">
        <div className="fw-700 fs-m">Location</div>
      </div>
      <MapContainer center={latLong} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={latLong} />
      </MapContainer>
    </div>
  );
};
