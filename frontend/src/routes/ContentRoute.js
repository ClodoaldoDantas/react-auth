import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ContentRoute({
  isPrivate = false,
  component: Component,
  ...rest
}) {
  const { signed } = useSelector(state => state.auth);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return isPrivate === signed ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/home',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
}
