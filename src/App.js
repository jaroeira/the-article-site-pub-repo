import './App.scss';
import { useState, useEffect, useCallback, useRef, lazy, Suspense } from 'react';
//Router
import { Switch, Route, useLocation } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { refreshTokenAction, authSelector } from './store/auth-slice';
import { autoLogin } from './store/auth-slice';

//helpers
import helper from './services/helper';

//Components
import Layout from './components/Layout/Layout';
import Loading from './components/UI/Loading';

//Pages
import Home from './pages/Home';
import ArticleDetail from './pages/ArticleDetail';
import VerifyEmail from './pages/auth/VerifyEmail';
import ResetPassword from './pages/auth/ResetPassword';

const UserProfile = lazy(() => import('./pages/auth/UserProfile'));
const Auth = lazy(() => import('./pages/auth/Auth'));
const MyArticles = lazy(() => import('./pages/MyArticles'));
const MyBookmarks = lazy(() => import('./pages/MyBookmarks'));
const SearchResult = lazy(() => import('./pages/SearchResult'));
const NewArticle = lazy(() => import('./pages/NewArticle'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));
//Admin pages
const Admin = lazy(() => import('./pages/admin/Admin'));
const CreateUser = lazy(() => import('./pages/admin/CreateUser'));
const EditUser = lazy(() => import('./pages/admin/EditUser'));
const ChangePassword = lazy(() => import('./pages/auth/ChangePassword'));

function App() {

  const location = useLocation();
  const [isHome, setIsHome] = useState(true);

  const dispatch = useDispatch();
  const { isAuthenticated, token } = useSelector(authSelector);

  const refreshTokenTimeout = useRef(null);

  const stopRefreshTokenTimer = useCallback(() => {
    if (refreshTokenTimeout.current) {
      console.log('remove timer');
      clearTimeout(refreshTokenTimeout.current);
    }
  }, []);

  //Once the user is authenticated set a timeout based on the token expiration
  //1 minute before the token expires a refreshToken action is dispatched
  const startRefreshTokenTimer = useCallback((token) => {
    console.log('start timer');

    stopRefreshTokenTimer();
    const { timeout } = helper.extratExpDateFromJwtToken(token);

    refreshTokenTimeout.current = setTimeout(() => {
      dispatch(refreshTokenAction());
    }, timeout);

  }, [dispatch, stopRefreshTokenTimer]);

  //Try autoLogin if authData is in the localStorage
  useEffect(() => {
    dispatch(autoLogin());
  }, [dispatch]);


  useEffect(() => {
    isAuthenticated ? startRefreshTokenTimer(token) : stopRefreshTokenTimer();
  }, [isAuthenticated, startRefreshTokenTimer, stopRefreshTokenTimer, token]);

  useEffect(() => {
    location.pathname === '/' ? setIsHome(true) : setIsHome(false);
  }, [location.pathname]);


  return (
    <Layout hideHeader={!isHome}>
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/article/:id' component={ArticleDetail} />
        <Route path='/reset-password' component={ResetPassword} />
        <Route path='/verify-email' component={VerifyEmail} />

        <Suspense fallback={<Loading />}>
          <Switch>
            <Route path='/auth' component={Auth} exact />
            <ProtectedRoute path='/auth/user-profile' component={UserProfile} />
            <ProtectedRoute path='/my-articles' component={MyArticles} />
            <ProtectedRoute path='/my-bookmarks' component={MyBookmarks} />
            <ProtectedRoute path='/new-article' component={NewArticle} exact roles={['Admin', 'Editor']} />
            <ProtectedRoute path='/edit-article/:id' component={NewArticle} roles={['Admin', 'Editor']} />
            <Route path='/articles/search' component={SearchResult} exact />
            <Route path='/articles/search/:tag' component={SearchResult} />
            <ProtectedRoute path='/admin' roles={['Admin']} component={Admin} exact />
            <ProtectedRoute path='/admin/create-user' roles={['Admin']} component={CreateUser} />
            <ProtectedRoute path='/admin/edit-user/:id' roles={['Admin']} component={EditUser} />
            <ProtectedRoute path='/admin/change-password' roles={['Admin']} component={ChangePassword} />
            <Route path='*' component={PageNotFound} />
          </Switch>
        </Suspense>

      </Switch>

    </Layout>
  );
}

export default App;
