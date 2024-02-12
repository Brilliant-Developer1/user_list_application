import { useEffect, useState } from 'react';
import UserCards from './UserCards';

const UserData = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dummyjson.com/users');
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full">
      <UserCards users={users}></UserCards>
    </div>
  );
};

export default UserData;
