import { Route, Redirect } from 'react-router-dom';
import { ROUTES } from './routes';
import { useLiskWallet } from '@lisk-react/use-lisk';

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
          return <Redirect to={ROUTES.LOGIN} />;
        }
      }}
    />
  );
};
