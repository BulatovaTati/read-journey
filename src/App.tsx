import { lazy, Suspense, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import useAuth from './hooks/useAuth';

import { fetchCurrentUser } from './redux/auth/operations';
import Layout from './components/Layout/Layout';

import Loader from './components/Loader/Loader';
import PrivateRoute from './components/Routes/PrivateRoute';
import RestrictedRoute from './components/Routes/RestrictedRoute';
import { useAppDispatch } from './redux/hooks';

const Register = lazy(() => import('./pages/RegisterPage/RegisterPage'));
const Login = lazy(() => import('./pages/LoginPage/LoginPage'));
const Recommended = lazy(() => import('./pages/RecommendedPage/RecommendedPage'));
const Library = lazy(() => import('./pages/MyLibraryPage/MyLibraryPage'));
const Reading = lazy(() => import('./pages/ReadingPage/ReadingPage'));
const NotFound = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

function App() {
  const dispatch = useAppDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  if (isRefreshing) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<PrivateRoute component={<Layout />} />}>
          <Route index element={<Navigate to="/recommended" replace />} />
          <Route path="recommended" element={<Recommended />} />
          <Route path="library" element={<Library />} />
          <Route path="reading" element={<Reading />} />
        </Route>

        <Route path="/register" element={<RestrictedRoute component={<Register />} />} />
        <Route path="/login" element={<RestrictedRoute component={<Login />} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
