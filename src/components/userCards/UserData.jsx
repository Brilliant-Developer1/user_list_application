import { useEffect, useState } from 'react';
import UserCards from './UserCards';

const UserData = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('https://dummyjson.com/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data.users);
      });
  }, []);

  return (
    <div>
      <UserCards users={users}></UserCards>
    </div>
  );
};

export default UserData;
