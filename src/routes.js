import routesPaths from './constants/routesPaths';
import HomePage from './containers/HomePage';
import LoginPage from './containers/LoginPage';
import SignUpPage from './containers/SignUpPage';
import NotFoundPage from './containers/NotFoundPage';
import EditForm from './components/user/EditForm';

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
    subRoutes: [
      {
        path: routesPaths.editUser,
        component: EditForm,
      }
    ]
  },
  {
    component: NotFoundPage
  }
];

export default routes;
