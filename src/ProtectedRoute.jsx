import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = (
  {component, path, key}
) => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  // 로그인이 되어있지 않으면(false), 홈페이지로 이동!!!
  if(!isLoggedIn) {
    return <Redirect to="/" />
  }
  return <Route
    component={component}
    path={path}
    key={key}
    exact
  />;
}

export default ProtectedRoute;