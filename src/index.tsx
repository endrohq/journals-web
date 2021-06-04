import ReactDOM from 'react-dom';

import './style.less';
import { availableNetworks } from './utils/networks';
import { AppContainer } from './container/AppContainer';
import { ApplicationRoutes } from './shared/router';
import { BrowserRouter } from 'react-router-dom';
import { LiskWalletProvider } from '@lisk-react/use-wallet';
import { LiskClientProvider } from '@lisk-react/use-client';
import { ModalContextProvider } from 'src/hooks/useModal';

const network: any = availableNetworks[0];

const targetNetwork = { wsUrl: network?.wsUrl, nodeUrl: network?.nodeUrl };

ReactDOM.render(
  <BrowserRouter>
    <ModalContextProvider>
      <LiskClientProvider targetNetwork={targetNetwork}>
        <LiskWalletProvider>
          <AppContainer>
            <ApplicationRoutes />
          </AppContainer>
        </LiskWalletProvider>
      </LiskClientProvider>
    </ModalContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
