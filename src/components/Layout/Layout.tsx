import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';

import Loader from '../Loader/Loader';
import Header from '../Header/Header';

const Layout = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Header />
        <main>
          <Outlet />
        </main>
      </Suspense>
      <Toaster />
    </>
  );
};

export default Layout;
