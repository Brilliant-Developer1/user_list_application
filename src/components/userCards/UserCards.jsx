import { Link } from 'react-router-dom';
import './UserCards.css';
import { useEffect, useState } from 'react';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import AddUser from '../AddUser/AddUser';
import SortFilterUsers from '../SortFilterUsers/SortFilterUsers';
import banner from '../../assets/banner.png';
import getAllUsers from '../../data/getAllUsers';

// eslint-disable-next-line react/prop-types
const UserCards = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // loading for 0.8 sec
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUsers = await getAllUsers();
        setUsers(fetchedUsers);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Sort users
  const sortUsers = option => {
    if (option === 'option1') {
      return [...users].sort((a, b) => (a.firstName > b.firstName ? 1 : -1));
    } else if (option === 'option2') {
      return [...users].sort((a, b) => (a.email > b.email ? 1 : -1));
    } else if (option === 'option3') {
      return [...users].sort((a, b) =>
        a.company.name > b.company.name ? 1 : -1
      );
    } else {
      return users;
    }
  };

  // Sort and filter users
  const sortedUsers = sortUsers(sortOption).filter(user =>
    `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchValue.toLowerCase())
  );

  return (
    <section className="container">
      {isLoading ? (
        // Loading Screen Start
        <LoadingScreen></LoadingScreen>
      ) : (
        // Loading Screen End
        // Cards Container Start
        <div className="mb-20 sm:mb-2  flex flex-col justify-center items-center  ">
          <div>
            <img className="rounded-b-lg" src={banner} alt="Banner" />
          </div>
          <div className="flex justify-center items-center flex-col ">
            {/* Sort and Search bar Start */}
            <div className="static sm:sticky bg-white top-0 z-10  p-8 w-full flex justify-around  items-center gap-3 sm:gap-1 flex-col lg:flex-row ">
              {/* Sort Option Start */}
              <SortFilterUsers
                setSortOption={setSortOption}
                sortOption={sortOption}
              ></SortFilterUsers>
              {/* Sort Option End */}
              {/* Search And Add User Form Start */}
              <div className="flex flex-col w-full sm:flex-row justify-end gap-2 ">
                <form className="flex-1 flex justify-end">
                  <input
                    type="text"
                    required
                    onChange={e => setSearchValue(e.target.value)}
                    placeholder="Search Names"
                    className="input input-bordered w-full max-w-none md:max-w-lg input-accent bg-transparent  "
                  />
                </form>
                {/* Add User Start */}
                <div className=" ">
                  <button
                    className=" btn w-full sm:w-auto btn-outline btn-accent"
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
            {/* Sort and Search bar End */}
            {/* Cards Grid Start */}
            <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 justify-items-center  w-full  text-2xl bg-emerald-100/60 p-10 rounded-xl ">
              {
                // eslint-disable-next-line react/prop-types
                sortedUsers.map(user => (
                  <Link key={user.id} to={`/userDetailsCard/${user.id}`}>
                    <div className=" text-center card  card_body hover:shadow-2xl shadow-lg transition ease-in-out duration-300 max-w-[300px] min-h-full">
                      <div className=" avatar p-5 min-h-[300px]  border-b-2 border-gray-300  justify-center items-center">
                        <img
                          className="max-h-[258px] object-top"
                          src={user.image}
                          alt="user Image"
                        />
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
        // Cards Container End
      )}
    </section>
  );
};

export default UserCards;
