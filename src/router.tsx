import { createBrowserRouter } from 'react-router-dom';

import Root from './routes/root.tsx';

import ErrorPage from './pages/ErrorPage/ErrorPage.tsx';
import HomePage from './pages/HomePage/HomePage.tsx';
import FormPage from './pages/FormPage/FormPage.tsx';
import UncontrolledForm from './features/UncontrolledForm/UncontrolledForm.tsx';

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
      {
        path: 'uncontrolled-form',
        element: <FormPage Form={UncontrolledForm} />,
      },
    ],
  },
]);

export default router;
