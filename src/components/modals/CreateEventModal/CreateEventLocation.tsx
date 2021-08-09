import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { FormInput } from '../../input/FormInput';

import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { Dropdown, Menu } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Label from '../../input/Label';
import { OpenStreetLocation } from '../../../typings';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { LocationIcon } from '../../icons/LocationIcon';
import { LatLng } from 'leaflet';
import _ from 'lodash';

interface Props {
  location: OpenStreetLocation;
  setLocation(openStreetLocation: OpenStreetLocation): void;
}

export const CreateEventLocation: FC<Props> = ({ location, setLocation }) => {
  const ref = useRef(null);

  const provider = useMemo(() => {
    return new OpenStreetMapProvider();
  }, []);

  const [results, setResults] = useState<OpenStreetLocation[]>();
  const [query, setQuery] = useState<string>();
  useClickOutside(ref, () => {
    setResults(undefined);
  });

  useEffect(() => {
    if (query) {
      search();
    }
  }, [query]);

  async function search() {
    const results = await provider.search({ query });
    setResults(
      results?.length > 5 ? results.splice(5, results?.length) : results
    );
  }

  const latLong = new LatLng(location?.y || 52.509, location?.x || 13.42338);

  return (
    <div ref={ref} className="mb25 w100">
      <Label label="Location" />
      <div className="mb10 flex-c">
        <div className="w100 pos-rel">
          <Dropdown
            visible={!!results}
            overlay={
              <Menu className="w100 bg--dd-menu">
                {results &&
                  results.map((result, idx) => (
                    <Menu.Item key={idx}>
                      <div
                        onMouseDown={() => setLocation(result)}
                        className="rounded p5-15 fc-gray-800 click flex-c flex-ww">
                        <div className="fc-gray-500">
                          <LocationIcon />
                        </div>
                        <div className="ml10">
                          {result?.label?.length > 50
                            ? `${result.label.substr(0, 50)}..`
                            : result.label}
                        </div>
                      </div>
                    </Menu.Item>
                  ))}
              </Menu>
            }
            placement="bottomRight"
            trigger={['click']}>
            <FormInput
              property="openStreetLocation"
              placeholder="London, New York, etc."
              value={query}
              suffix={
                <SearchOutlined
                  className="click fc-blue__hover fs-m mr5 m0 p0"
                  onClick={search}
                />
              }
              setValue={_.debounce(q => setQuery(q), 750)}
            />
          </Dropdown>
        </div>
      </div>
      <MapContainer center={latLong} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <CreateEventLocationMapControls latLong={latLong} />
        <Marker position={latLong}>
          <Popup>{location?.label}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

const CreateEventLocationMapControls: FC<{ latLong: LatLng }> = ({
  latLong
}) => {
  const map = useMap();
  useEffect(() => {
    if (latLong) {
      map.setView(latLong);
    }
  }, [latLong]);

  return <></>;
};
