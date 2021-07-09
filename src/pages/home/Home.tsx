import React, { useEffect } from 'react';
import { HomeEvents } from './HomeEvents';

interface ContainerProps {}

const menu = ['World', 'Business', 'Tech', 'Science', 'Stories', 'Health'];

const Home: React.FC<ContainerProps> = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="grid-xl mt50 mb200">
      <div className="mb25 border-bottom flex-c flex-jc-sb">
        {menu.map(item => (
          <div className="pl25 pb15 pr25 click fc-lb__hover fc-gray-500 fs-m">
            {item}
          </div>
        ))}
      </div>
      <HomeEvents />
    </div>
  );
};

export default Home;
