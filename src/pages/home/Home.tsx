import React, { useEffect } from 'react';

import { useLiskClient } from '@lisk-react/use-client';

interface ContainerProps {}

const Home: React.FC<ContainerProps> = () => {
  const { block } = useLiskClient();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="grid-xl mt50 mb200">
      <pre>{JSON.stringify(block, null, 2)}</pre>
    </div>
  );
};

export default Home;
