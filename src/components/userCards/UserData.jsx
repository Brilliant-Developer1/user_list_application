import { useEffect, useState } from 'react';
import UserCards from './UserCards';
import getAllUsers from '../../data/getAllUsers';

export default function UserData() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <UserCards users={users}></UserCards>
    </div>
  );
}
