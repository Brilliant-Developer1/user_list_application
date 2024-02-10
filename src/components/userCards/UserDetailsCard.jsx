import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './UserCards.css';
const UserDetailsCard = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/users/${userId}`);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserDetails();
  }, [userId]);

  if (!user) {
    return (
      <div className="bg-white flex-col text-black max-w-full flex justify-center items-center h-screen ">
        <div className="loader"></div>
        <p className="p-5">Wait!</p>
      </div>
    );
  }

  return (
    <div className="bg-white flex justify-center items-center h-screen">
      <div className="flex md:flex-row flex-col p-5 border-2 border-black rounded-2xl">
        <div className=" max-w-full p-5 border-2 border-black rounded">
          <img src={user.image} alt="profile Image" />
        </div>
        <div className="p-5 flex flex-col items-center justify-around">
          <h1 className="text-8xl ">
            {user.firstName} {user.lastName}
          </h1>
          <div className="text-black mt-2">
            <p className="card-title text-base justify-center">
              Email: <span className="font-normal">{user.email}</span>
            </p>
            <div className="flex  flex-col items-center ">
              <p className="card-title justify-center text-base items-start">
                Address:{' '}
              </p>
              <span className=" text-base">
                {user.address.address}, {user.address.city}
              </span>
            </div>
            <div className="flex  flex-col items-center ">
              <p className="card-title justify-center text-base items-start">
                Company Name:{' '}
              </p>
              <span className=" text-base">{user.company.name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsCard;
