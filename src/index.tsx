import ReactDOM from 'react-dom';

import './style.less';

import { LiskProvider } from '@lisk-react/use-lisk';
import { availableNetworks } from './utils/network.utils';
import { AppContainer } from './container/AppContainer';

import { ApplicationRoutes } from './shared/router';
import { BrowserRouter } from 'react-router-dom';
import { ModalContextProvider } from './hooks/useModal';

const network: any = availableNetworks[0];

const targetNetwork = { wsUrl: network?.wsUrl, nodeUrl: network?.nodeUrl };

function render() {
  ReactDOM.render(
    <LiskProvider endpoint={targetNetwork}>
      <BrowserRouter>
        <ModalContextProvider>
          <AppContainer>
            <ApplicationRoutes />
          </AppContainer>
        </ModalContextProvider>
      </BrowserRouter>
    </LiskProvider>,
    document.getElementById('root')
  );
}

render();
