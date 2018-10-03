import routesPaths from './constants/routesPaths';
import HomePage from './containers/HomePage';
import LoginPage from './containers/LoginPage';
import SignUpPage from './containers/SignUpPage';
import NotFoundPage from './containers/NotFoundPage';

const routes = [
  {
    path: routesPaths.signUp,
    component: SignUpPage
  },
  {
    path: routesPaths.login,
    component: LoginPage
  },
  {
    path: routesPaths.index,
    component: HomePage,
    private: true,
  },
  {
    component: NotFoundPage
  }
];

export default routes;
