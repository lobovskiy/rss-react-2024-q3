import { createBrowserRouter } from 'react-router-dom';

import Root from './routes/root.tsx';

import ErrorPage from './pages/ErrorPage/ErrorPage.tsx';
import HomePage from './pages/HomePage/HomePage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
]);

export default router;
