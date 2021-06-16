import React, { useEffect } from 'react';
import { Logo } from '../../assets/Logo';
import { HomeEvents } from './HomeEvents';

interface ContainerProps {}

const Home: React.FC<ContainerProps> = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="grid-xl mt50 mb200">
      <div className="w100 flex-c  flex-column">
        <div className="mb10">
          <Logo />
        </div>
        <div className="home-logo w100">
          <h2 className="fs-m fc-gray-200">
            <span>Investigative Journalism done right</span>
          </h2>
        </div>
      </div>
      <HomeEvents />
    </div>
  );
};

export default Home;
