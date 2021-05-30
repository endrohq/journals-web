import React, { useEffect } from 'react';

interface ContainerProps {}

const Home: React.FC<ContainerProps> = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <div className="grid-xl mt50 mb200">Homepage</div>;
};

export default Home;
