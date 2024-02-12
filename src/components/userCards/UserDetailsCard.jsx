import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './UserCards.css';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
const UserDetailsCard = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Fetch all user data from the API
        const response = await fetch(`https://dummyjson.com/users`);
        const apiUserData = await response.json();

        // Check if apiUserData is an object
        if (!Array.isArray(apiUserData.users)) {
          console.error('API data is not an array:', apiUserData.users);
          return;
        }

        // Retrieve user data from local storage
        const localStorageUserData =
          JSON.parse(localStorage.getItem('users')) || [];

        const mergeUsers = localStorageUserData.map(user => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          companyName: user.companyName,
          image: user.image,
          address: {
            address: user.address?.address || '',
            city: user.address?.city || '',
          },
          company: {
            name: user.companyName || '',
            department: '',
            title: '',
          },
        }));

        // Merge API user data with local storage user data
        const allUserData = [...apiUserData.users, ...mergeUsers];

        // Find the user by userId parameter
        const foundUser = allUserData.find(
          user => user.id === parseInt(userId)
        );

        // Set the user details if found
        if (foundUser) {
          setUser(foundUser);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (!user) {
    return (
      <div className="bg-blur flex-col text-black max-w-full flex justify-center items-center h-screen ">
        <div className="loader"></div>
        <p className="p-5">Wait!</p>
      </div>
    );
  }

  return (
    <>
      {!user ? (
        <LoadingScreen></LoadingScreen>
      ) : (
        <div className="bg-blur  flex flex-col justify-center items-center h-auto sm:h-screen">
          <div className="flex  md:flex-row flex-col items-center h-auto m-3 p-5  bg-cyan-100 rounded-2xl">
            <div className=" max-w-96 flex justify-center flex-1 p-5 border border-black rounded">
              <img src={user.image} alt="profile Image" />
            </div>
            <div className="flex flex-col items-end">
              <div className="p-5 flex flex-col  items-center justify-around">
                <h1 className="text-5xl md:text-7xl sm:text-6xl text-center ">
                  {user.firstName} {user.lastName}
                </h1>
                <div className="text-black mt-4">
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
              <div className="">
                <Link to={'/'}>
                  <button className="btn btn-square">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-arrow-big-left-line"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#ffffff"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 15v3.586a1 1 0 0 1 -1.707 .707l-6.586 -6.586a1 1 0 0 1 0 -1.414l6.586 -6.586a1 1 0 0 1 1.707 .707v3.586h6v6h-6z" />
                      <path d="M21 15v-6" />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className=" block sm:hidden" style={{ height: 290 }}></div>
        </div>
      )}
    </>
  );
};

export default UserDetailsCard;
