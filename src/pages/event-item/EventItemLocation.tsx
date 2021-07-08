import { FC } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { LatLng } from 'leaflet';
import { NewsEventActivity } from '../../typings';

interface Props {
  activity: NewsEventActivity[];
}

export const EventItemLocation: FC<Props> = ({ activity }) => {
  const locations = activity.map(item => item.location);
  const location = locations[0];
  const latLong = new LatLng(
    Number(location?.latitude),
    Number(location?.longitude)
  );
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
