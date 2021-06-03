import React, { useEffect, useState } from 'react';
import { Loading } from '../../components/loaders/Loading';
import { Redirect } from 'react-router';
import { ROUTES } from '../../shared/router/routes';
import { useLiskWallet } from '@lisk-react/use-wallet';


interface ContainerProps {}

const LogoutPage: React.FC<ContainerProps> = () => {
  const { logout } = useLiskWallet();
  const [loggedOut, setLoggedOut] = useState<boolean>(false);

  useEffect(() => {
    handleLogout();
  }, []);

  async function handleLogout() {
    await logout();
    setLoggedOut(true);
    return () => '';
  }

  if (!loggedOut) {
    return (
      <div className="w50 m-auto mt125">
        <Loading />
      </div>
    );
  } else {
    return <Redirect to={ROUTES.LOGIN} />;
  }
};

export default LogoutPage;
