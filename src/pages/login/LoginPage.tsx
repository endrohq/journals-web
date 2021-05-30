import React, { useEffect, useState } from 'react';
import { History } from 'history';
import { Link, useHistory } from 'react-router-dom';
import { ROUTES } from '../../shared/router/routes';
import { Button } from 'antd';
import { PassphraseInput } from '../../components/PassphraseInput';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Loading } from '../../components/loaders/Loading';
import { useLiskWallet } from '../../lisk-react/providers/LiskWalletProvider';

interface ContainerProps {
  isValidAndSynced: boolean;
  history: History;
}

export const LoginPage: React.FC<ContainerProps> = () => {
  const { isAuthenticated, loading, authenticate, logout } = useLiskWallet();
  const history = useHistory();
  const [showPassphrase, setShowPassphrase] = useState<boolean>(false);
  const [passphrase, setPassphrase] = useState<string>('');

  useEffect(() => {
    console.log(isAuthenticated);
    if (isAuthenticated) {
      history.push(ROUTES.HOME);
    }
  }, [isAuthenticated]);

  async function login() {
    try {
      await authenticate(passphrase);
    } catch (e) {
      console.error(e);
      logout();
    }
  }

  if (!isAuthenticated && loading) {
    return (
      <div className="w50 m-auto mt75 mb75 flex-jc-c flex-c">
        <Loading />
      </div>
    );
  }

  return (
    <div className="grid-s m-auto">
      <div className="mb50 flex-c flex-jc-c flex-column mt125">
        <h1 className="fs-xxl ffm-bold p0 m0">
          Welcome to <span className="fc-primary ffm-bold">Arcado</span>
        </h1>
        <h2 className="fs-m fc-grey p0 m0">Sign in with a passphrase</h2>
      </div>

      <div className="w100 mb50">
        <div className="mb50">
          <div className="flex-c flex-jc-sb w100">
            <div className="fs-l fc-lb ffm-bold mb5">Enter Passphrase</div>
            <div
              onClick={() => setShowPassphrase(!showPassphrase)}
              className="click">
              {showPassphrase ? <EyeInvisibleOutlined /> : <EyeOutlined />}
              <span className="ml10">{showPassphrase ? 'Hide' : 'Show'}</span>
            </div>
          </div>
          <div className="fs-n fc-grey mb50">
            Your passphrase is the gateway to our gaming universe
          </div>
        </div>
        <PassphraseInput
          setValidPassphrase={setPassphrase}
          showPassphrase={showPassphrase}
        />
      </div>
      <div className="flex-c">
        <div className="ml-auto">
          <Link to={ROUTES.INITIALISE}>
            <Button className="w175--fixed h45--fixed mr15">
              Create account
            </Button>
          </Link>
          <Button
            disabled={!passphrase}
            type="primary"
            className="w175--fixed h45--fixed"
            onClick={login}>
            Sign in
          </Button>
        </div>
      </div>
    </div>
  );
};
