import { createBrowserRouter } from 'react-router-dom';
import Home from '../Home';
import UserDetailsCard from '../../components/userCards/UserDetailsCard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>,
    children: [
      {
        path: '/home',
        element: <Home></Home>,
      },
    ],
  },
  {
    path: '/userDetailsCard/:userId',
    element: <UserDetailsCard></UserDetailsCard>,
  },
]);

export default router;
