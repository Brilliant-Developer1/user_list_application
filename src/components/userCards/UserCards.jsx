import { Link } from 'react-router-dom';
import './UserCards.css';
import { useEffect, useState } from 'react';

// eslint-disable-next-line react/prop-types
const UserCards = ({ users }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    // Simulate loading for 0.2 seconds
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 200);

    // Cleanup function to clear the timeout
    return () => clearTimeout(timeout);
  }, []);

  // Sort users based on selected option
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
  if (isLoading) {
    return (
      <div className="bg-white flex-col text-black flex justify-center items-center h-screen">
        <div className="loader"></div>
        <p className="p-5">Wait!</p>
      </div>
    );
  }

  return (
    <div className="  flex   max-w-[1760px] justify-center items-center h-auto p-5 ">
      <div className="flex justify-center items-center flex-col  shadow-2xl rounded-3xl border-4">
        <div className="sticky top-0 z-10 rounded-3xl bg-white w-full">
          <div className="  border-b-4 w-full mx-auto  p-5 flex justify-around items-center gap-3 sm:gap-1 flex-col sm:flex-row">
            <div className="flex-1 w-full flex justify-center">
              <select
                value={sortOption}
                onChange={e => setSortOption(e.target.value)}
                className="select select-accent  w-full max-w-lg bg-transparent"
              >
                <option value="">Sort options</option>
                <option value="option1">Sort by name</option>
                <option value="option2">Sort by email</option>
                <option value="option3">Sort by Company name</option>
              </select>
            </div>
            <div className="flex flex-1 justify-center gap-2 w-full">
              <form className="flex-1">
                <input
                  type="text"
                  required
                  onChange={e => setSearchValue(e.target.value)}
                  placeholder="Search Names"
                  className="input input-bordered input-accent   bg-transparent w-full sm:max-w-96"
                />
              </form>

              <button
                className="flex-1 btn btn-outline btn-accent"
                onClick={() =>
                  document.getElementById('my_modal_2').showModal()
                }
              >
                open modal
              </button>
              <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Hello!</h3>
                  <p className="py-4">
                    Press ESC key or click outside to close
                  </p>
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog>
            </div>
          </div>
        </div>
        <div className="   flex flex-wrap gap-6 p-5 justify-center text-2xl ">
          {
            // eslint-disable-next-line react/prop-types
            sortedUsers.map(user => (
              <Link key={user.id} to={`/userDetailsCard/${user.id}`}>
                <div className=" text-center card w-72 sm:w-96 bg-zinc-300 hover:shadow-2xl shadow-lg">
                  <div className=" avatar p-5 m-5 mb-0  justify-center">
                    <div className=" max-w-full p-5 border-2 border-black rounded">
                      <img src={user.image} alt="user Image" />
                    </div>
                  </div>

                  <div className="card-body p-2 sm:p-5 text-black">
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
