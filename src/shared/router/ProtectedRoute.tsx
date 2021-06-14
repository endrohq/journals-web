import { Route } from 'react-router-dom';
import { useLiskWallet } from '@lisk-react/use-lisk';
import { NotAuthenticated } from '../../components/authentication/NotAuthenticated';

interface ContainerProps {
  component: any;
  exact?: boolean;
  path: String;
}

export const ProtectedRoute = ({
  component: Component,
  exact,
  path,
  ...rest
}: ContainerProps) => {
  const { isAuthenticated } = useLiskWallet();
  return (
    <Route
      {...rest}
      render={props => {
        if (isAuthenticated) {
          return <Component {...rest} {...props} />;
        } else {
          return <NotAuthenticated />;
        }
      }}
    />
  );
};
