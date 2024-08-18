import { createBrowserRouter } from 'react-router-dom';

import Root from './routes/root';

import ErrorPage from './pages/ErrorPage/ErrorPage';
import HomePage from './pages/HomePage/HomePage';
import FormPage from './pages/FormPage/FormPage';
import UncontrolledForm from './features/UncontrolledForm/UncontrolledForm';
import HookForm from './features/HookForm/HookForm';

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
        element: <FormPage Form={UncontrolledForm} formTitle="Uncontrolled" />,
      },
      {
        path: 'hook-form',
        element: <FormPage Form={HookForm} formTitle="Hook" />,
      },
    ],
  },
]);

export default router;
