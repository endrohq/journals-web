import React, { useEffect, useState } from 'react';
import { History } from 'history';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { ROUTES } from '../../shared/router/routes';
import { Button } from 'antd';
import { PassphraseInput } from '../../components/input/PassphraseInput';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { useWallet } from '@lisk-react/use-lisk';
import * as qs from 'query-string';

interface ContainerProps {
  isValidAndSynced: boolean;
  history: History;
}

const LoginPage: React.FC<ContainerProps> = () => {
  const { isAuthenticated, authenticate, logout } = useWallet();
  const history = useHistory();
  const location = useLocation();
  const [showPassphrase, setShowPassphrase] = useState<boolean>(false);
  const [passphrase, setPassphrase] = useState<string>(
    'alone rocket biology much cement fix under panther tower senior need pen'
  );

  useEffect(() => {
    if (isAuthenticated) {
      const params = qs.parse(location.search);
      let route = params?.prevRoute
        ? params?.prevRoute?.toString()
        : ROUTES.HOME;
      history.push(route);
    }
  }, [isAuthenticated, history]);

  async function login() {
    try {
      await authenticate(passphrase);
    } catch (e) {
      console.error(e);
      logout();
    }
  }

  return (
    <div className="grid-s m-auto">
      <div className="mb50 flex-c flex-jc-c flex-column mt125">
        <h1 className="fs-xxl fw-700 p0 m0">Welcome to Journals</h1>
        <h2 className="fs-m fc-gray-600 p0 m0">Sign in with a passphrase</h2>
      </div>

      <div className="w100 mb50">
        <div className="mb50">
          <div className="flex-c flex-jc-sb w100">
            <div className="fs-l fc-lb fw-700 mb5">Enter Passphrase</div>
            <div
              onClick={() => setShowPassphrase(!showPassphrase)}
              className="click">
              {showPassphrase ? <EyeInvisibleOutlined /> : <EyeOutlined />}
              <span className="ml10">{showPassphrase ? 'Hide' : 'Show'}</span>
            </div>
          </div>
          <div className="fs-n fc-gray-600 mb50">
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

export default LoginPage;
