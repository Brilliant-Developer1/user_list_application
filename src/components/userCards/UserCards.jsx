import { Link } from 'react-router-dom';
import './UserCards.css';
import { useEffect, useState } from 'react';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

// eslint-disable-next-line react/prop-types
const UserCards = ({ users }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [newUserData, setNewUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: { address: '', city: '' },
    companyName: '',
    image: '',
  });

  // Add new user
  const handleAddUser = e => {
    e.preventDefault();

    if (newUserData.image instanceof File) {
      const reader = new FileReader();
      reader.onload = e => {
        const imageUrl = e.target.result;

        // Create a new user object
        const newUser = {
          // eslint-disable-next-line react/prop-types
          id: Math.floor(Math.random() * 1000),
          firstName: newUserData.firstName,
          lastName: newUserData.lastName,
          email: newUserData.email,
          address: newUserData.address,
          companyName: newUserData.companyName,
          image: imageUrl,
        };

        // Get back existing user data from local storage
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

        // Add the new user to the existing user data
        const updatedUsers = [...existingUsers, newUser];

        // Save the updated user data to local storage
        localStorage.setItem('users', JSON.stringify(updatedUsers));

        // Reset form

        setNewUserData({
          firstName: '',
          lastName: '',
          email: '',
          address: { address: '', city: '' },
          companyName: '',
          image: '',
        });
      };
      reader.readAsDataURL(newUserData.image);
    } else {
      console.error('No image file selected.');
    }
  };

  useEffect(() => {
    // loading for 0.2 sec
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

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
        <div className="  flex justify-center items-center h-auto  sm:p-5 p-1 ">
          <div className="flex justify-center items-center flex-col  shadow-2xl">
            {/* Sort and Search bar Start */}
            <div className="sticky top-0 z-10 rounded-t-2xl bg-white w-full">
              <div className="  border-4 rounded-t-2xl w-full mx-auto  p-5 flex justify-around items-center gap-3 sm:gap-1 flex-col sm:flex-row">
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
                {/* Search And Add User Form Start */}
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
                  {/* Add User Start */}
                  <button
                    className="flex-1 btn btn-outline btn-accent"
                    onClick={() =>
                      document.getElementById('my_modal_2').showModal()
                    }
                  >
                    Add User
                  </button>
                  <dialog id="my_modal_2" className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">Add New User</h3>
                      <form onSubmit={handleAddUser} className="  py-4">
                        <label className="form-control w-full max-w-2xl">
                          <div className="label">
                            <span className="label-text">Name?</span>
                          </div>
                          <div className="flex gap-1">
                            <input
                              type="text"
                              placeholder="Fist Name"
                              value={newUserData ? newUserData.firstName : ''}
                              className="input input-bordered input-accent   bg-transparent w-full "
                              onChange={e =>
                                setNewUserData({
                                  ...newUserData,
                                  firstName: e.target.value,
                                })
                              }
                            />
                            <input
                              type="text"
                              placeholder="Last Name"
                              value={newUserData ? newUserData.lastName : ''}
                              className="input input-bordered input-accent   bg-transparent w-full "
                              onChange={e =>
                                setNewUserData({
                                  ...newUserData,
                                  lastName: e.target.value,
                                })
                              }
                            />
                          </div>
                        </label>
                        <label className="form-control w-full max-w-2xl">
                          <div className="label">
                            <span className="label-text">Email?</span>
                          </div>
                          <input
                            type="email"
                            placeholder="Email"
                            value={newUserData ? newUserData.email : ''}
                            className="input input-bordered input-accent   bg-transparent w-full "
                            onChange={e =>
                              setNewUserData({
                                ...newUserData,
                                email: e.target.value,
                              })
                            }
                          />
                        </label>
                        <label className="form-control w-full max-w-2xl">
                          <div className="label">
                            <span className="label-text">Address?</span>
                          </div>
                          <div className="flex gap-1">
                            <input
                              type="text"
                              placeholder="Street & Suite"
                              value={
                                newUserData ? newUserData.address.address : ''
                              }
                              className="input input-bordered input-accent   bg-transparent w-full sm:max-w-96 "
                              onChange={e =>
                                setNewUserData(prevState => ({
                                  ...prevState,
                                  address: {
                                    ...prevState.address,
                                    address: e.target.value,
                                  },
                                }))
                              }
                            />
                            <input
                              type="text"
                              placeholder="City"
                              value={
                                newUserData ? newUserData.address.city : ''
                              }
                              className="input input-bordered input-accent   bg-transparent w-full sm:max-w-96"
                              onChange={e =>
                                setNewUserData(prevState => ({
                                  ...prevState,
                                  address: {
                                    ...prevState.address,
                                    city: e.target.value,
                                  },
                                }))
                              }
                            />
                          </div>
                        </label>
                        <label className="form-control w-full max-w-2xl">
                          <div className="label">
                            <span className="label-text">Company Name?</span>
                          </div>
                          <input
                            type="text"
                            placeholder="Company Name"
                            value={newUserData ? newUserData.companyName : ''}
                            className="input input-bordered input-accent   bg-transparent w-full "
                            onChange={e =>
                              setNewUserData({
                                ...newUserData,
                                companyName: e.target.value,
                              })
                            }
                          />
                        </label>
                        <label className="form-control w-full max-w-2xl">
                          <div className="label">
                            <span className="label-text">Upload Image</span>
                          </div>
                          <input
                            type="file"
                            className="file-input file-input-bordered file-input-accent bg-transparent w-full"
                            onChange={e =>
                              setNewUserData({
                                ...newUserData,
                                image: e.target.files[0],
                              })
                            }
                          />
                        </label>
                        <button
                          type="submit"
                          className="btn my-4 w-full btn-outline btn-accent"
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog>
                  {/* Add User End */}
                </div>
                {/* Search And Add User Form End */}
              </div>
            </div>
            {/* Sort and Search bar End */}
            {/* Cards Grid Start */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 justify-items-center  w-full border-4 border-t-0 rounded-b-2xl p-1  sm:p-5 text-2xl ">
              {
                // eslint-disable-next-line react/prop-types
                sortedUsers.map(user => (
                  <Link key={user.id} to={`/userDetailsCard/${user.id}`}>
                    <div className=" text-center card max-w-72 sm:max-w-80 sm:w-96 bg-white hover:shadow-2xl shadow-lg">
                      <div className=" avatar  w-full  border-b-2 border-gray-300  justify-center">
                        <div className=" w-full rounded-t-2xl  ">
                          <img src={user.image} alt="user Image" />
                        </div>
                      </div>

                      <div className="card-body p-2 sm:p-3 text-black">
                        <p className="card-title text-base justify-center">
                          {user.firstName} {user.lastName}
                        </p>

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
