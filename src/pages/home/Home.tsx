import React, { useEffect } from 'react';
import { Logo } from '../../assets/Logo';

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
      <div className="grid-col4 mt50">
        {['', '', '', '', '', '', '', ''].map((item, idx) => (
          <div key={idx} className="bg-gray-200 rounded-1 h200--fixed" />
        ))}
      </div>
    </div>
  );
};

export default Home;
