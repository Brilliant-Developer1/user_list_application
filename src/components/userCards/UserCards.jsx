import { Link } from 'react-router-dom';
import './UserCards.css';
import { useEffect, useState } from 'react';

// eslint-disable-next-line react/prop-types
const UserCards = ({ users }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    // Simulate loading for 0.2 seconds
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 200);

    // Cleanup function to clear the timeout
    return () => clearTimeout(timeout);
  }, []);
  const handleSearch = e => {
    e.preventDefault();

    setSearchValue('');
  };

  // Filter users by search value
  // eslint-disable-next-line react/prop-types
  const filterUsers = users.filter(user =>
    `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchValue.toLowerCase())
  );
  if (isLoading) {
    return (
      <div className="bg-white flex-col text-black flex justify-center items-center h-screen">
        <div className="loader"></div>
        <p className="p-5">Wait!</p>
      </div>
    );
  }

  return (
    <div className="  flex   max-w-[1760px] justify-center items-center h-auto  ">
      <div className="flex justify-center items-center flex-col m-10 shadow-2xl rounded-3xl">
        <div className=" w-full mx-auto  p-5 flex justify-between items-center">
          <p>SORT FUNCTIONS</p>
          <div>
            <div>
              <form className="flex gap-2 " action="" onSubmit={handleSearch}>
                <input
                  type="text"
                  required
                  onChange={e => setSearchValue(e.target.value)}
                  placeholder="Search Names"
                  className="input input-bordered input-accent w-full  bg-transparent"
                />
                <button type="submit" className="btn btn-outline btn-accent">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="   flex flex-wrap gap-6 p-5 justify-center text-2xl ">
          {
            // eslint-disable-next-line react/prop-types
            filterUsers.map(user => (
              <Link key={user.id} to={`/userDetailsCard/${user.id}`}>
                <div className=" card w-72 sm:w-96 bg-zinc-300 hover:shadow-2xl shadow-lg">
                  <div className=" avatar p-5 m-5  justify-center">
                    <div className=" max-w-full p-5 border-2 border-black rounded">
                      <img src={user.image} alt="user Image" />
                    </div>
                  </div>

                  <div className="card-body pt-0 text-black">
                    <p className="card-title text-base justify-center">
                      {user.firstName} {user.lastName}
                    </p>

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
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default UserCards;
