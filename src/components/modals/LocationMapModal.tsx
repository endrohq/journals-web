import React from 'react';

import { LocationProps, ModalProps } from './';
import { LatLng } from 'leaflet';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

export const LocationMapModal: React.FC<ModalProps<LocationProps>> = ({
  data: { location, openStreetLocation }
}) => {
  const latLongs = location.map(
    item => new LatLng(Number(item.latitude), Number(item.longitude))
  );
  return (
    <div className="p15-25 w100 location-modal">
      <div className="mb15">
        <div className="fw-700 fs-m">Location</div>
        <div className="">{openStreetLocation.label}</div>
      </div>
      <MapContainer className="" center={latLongs[0]} zoom={13} scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {latLongs.map(item => (
          <Marker position={item} />
        ))}
      </MapContainer>
    </div>
  );
};
