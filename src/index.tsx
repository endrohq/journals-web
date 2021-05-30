import ReactDOM from 'react-dom';

import './style.less';

import { AppContainer } from './container/AppContainer';
import { ApplicationRoutes } from './shared/router';
import { BrowserRouter } from 'react-router-dom';
import { LiskWalletProvider } from './lisk-react/providers/LiskWalletProvider';
import { LiskClientProvider } from './lisk-react/providers/LiskClientProvider';

ReactDOM.render(
  <BrowserRouter>
    <LiskClientProvider>
      <LiskWalletProvider>
        <AppContainer>
          <ApplicationRoutes />
        </AppContainer>
      </LiskWalletProvider>
    </LiskClientProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
