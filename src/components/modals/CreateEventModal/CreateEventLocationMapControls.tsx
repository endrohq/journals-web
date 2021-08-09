import { FC, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { LatLng } from 'leaflet';

export const CreateEventLocationMapControls: FC<{ longLat: LatLng }> = ({
  longLat
}) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(longLat);
  }, [longLat]);

  return <></>;
};
