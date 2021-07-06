import React, { useEffect } from 'react';
import { HomeEvents } from './HomeEvents';

interface ContainerProps {}

const Home: React.FC<ContainerProps> = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="grid-xl mt50 mb200">
      <HomeEvents />
    </div>
  );
};

export default Home;
