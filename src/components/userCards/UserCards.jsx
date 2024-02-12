import { Link } from 'react-router-dom';
import './UserCards.css';
import { useEffect, useState } from 'react';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import AddUser from '../AddUser/AddUser';
import SortFilterUsers from '../SortFilterUsers/SortFilterUsers';

// eslint-disable-next-line react/prop-types
const UserCards = ({ users }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    // loading for 0.2 sec
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  // Saved local storage users
  const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

  const mergeUsers = existingUsers.map(user => ({
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
  const mergedUsers = [...users, ...mergeUsers];

  // Sort users
  const sortUsers = option => {
    if (option === 'option1') {
      return [...mergedUsers].sort((a, b) =>
        a.firstName > b.firstName ? 1 : -1
      );
    } else if (option === 'option2') {
      return [...mergedUsers].sort((a, b) => (a.email > b.email ? 1 : -1));
    } else if (option === 'option3') {
      return [...mergedUsers].sort((a, b) =>
        a.company.name > b.company.name ? 1 : -1
      );
    } else {
      return mergedUsers;
    }
  };

  // Sort and filter users
  const sortedUsers = sortUsers(sortOption).filter(user =>
    `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchValue.toLowerCase())
  );

  return (
    <>
      {isLoading ? (
        // Loading Screen Start
        <LoadingScreen></LoadingScreen>
      ) : (
        // Loading Screen End
        // Cards body Start
        <div className="  flex justify-center items-center w-full  sm:p-5 p-1 ">
          <div className="flex justify-center items-center flex-col w-full max-w-[1760px] h-full shadow-2xl">
            {/* Sort and Search bar Start */}
            <div className=" static sm:sticky top-0 z-10 rounded-t-2xl bg-white w-full">
              <div className="  border-4 rounded-t-2xl   p-5 flex justify-around items-center gap-3 sm:gap-1 flex-col md:flex-row">
                {/* Sort Option Start */}
                <SortFilterUsers
                  setSortOption={setSortOption}
                  sortOption={sortOption}
                ></SortFilterUsers>
                {/* Sort Option End */}
                {/* Search And Add User Form Start */}
                <div className="flex flex-1 flex-col sm:flex-row justify-center gap-2 w-full">
                  <form className="flex-1">
                    <input
                      type="text"
                      required
                      onChange={e => setSearchValue(e.target.value)}
                      placeholder="Search Names"
                      className="input input-bordered input-accent   bg-transparent w-full sm:max-w-96"
                    />
                  </form>
                  {/* Add User Start */}
                  <div className="flex-1 ">
                    <button
                      className=" btn w-full btn-outline btn-accent"
                      onClick={() =>
                        document.getElementById('my_modal_2').showModal()
                      }
                    >
                      Add User
                    </button>
                    <AddUser></AddUser>
                  </div>
                  {/* Add User End */}
                </div>
                {/* Search And Add User Form End */}
              </div>
            </div>
            {/* Sort and Search bar End */}
            {/* Cards Grid Start */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 justify-items-center  w-full p-1  sm:p-5 text-2xl ">
              {
                // eslint-disable-next-line react/prop-types
                sortedUsers.map(user => (
                  <Link key={user.id} to={`/userDetailsCard/${user.id}`}>
                    <div className=" text-center card max-w-96  sm:w-screen bg-white hover:shadow-2xl shadow-lg">
                      <div className=" avatar  w-full  border-b-2 border-gray-300  justify-center">
                        <div className=" w-full rounded-t-2xl  ">
                          <img src={user.image} alt="user Image" />
                        </div>
                      </div>

                      <div className="card-body p-2 sm:p-3 text-slate-600 h-auto sm:h-60">
                        <div>
                          <p className="card-title text-slate-700 justify-center">
                            {user.firstName} {user.lastName}
                          </p>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-center items-center">
                          <p className="card-title text-base flex-none  ">
                            Email:
                          </p>
                          <span className="text-base ml-1">{user.email}</span>
                        </div>
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
                          <span className=" text-base">
                            {user.company.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              }
            </div>
            {/* Cards Grid End */}
          </div>
        </div>
        // Cards body End
      )}
    </>
  );
};

export default UserCards;
