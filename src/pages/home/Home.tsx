import React, { useEffect } from 'react';
import { HomeEvents } from './HomeEvents';

interface ContainerProps {}

const menu = [
  'Home',
  'World',
  'Europe',
  'Business',
  'Tech',
  'Science',
  'Stories',
  'In Pictures',
  'Sports',
  'Health'
];

const Home: React.FC<ContainerProps> = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="grid-xl mt50 mb200">
      <div className="mb25 border-bottom flex-c flex-jc-sb ">
        {menu.map((item, idx) => (
          <div
            className={`pl25 pb5 pr25 click fc-lb__hover border-bottom border-width-2 ${
              idx === 0
                ? ' border-black fw-700 fc-black'
                : 'border-trans fc-gray-500'
            }`}>
            {item}
          </div>
        ))}
      </div>
      <HomeEvents />
    </div>
  );
};

export default Home;
