import { createBrowserRouter } from 'react-router-dom';
import Home from '../Home/Home';
import UserDetailsCard from '../../components/userCards/UserDetailsCard';
import Dashboard from '../../components/Dashboard/Dashboard';
import Sidebar from '../Sidebar/Sidebar';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Sidebar></Sidebar>,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
      },
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
