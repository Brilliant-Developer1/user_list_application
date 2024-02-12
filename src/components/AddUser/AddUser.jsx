import { useState } from 'react';

const AddUser = () => {
  //   console.log(props);
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
        window.location.reload();
      };
      reader.readAsDataURL(newUserData.image);
    } else {
      console.error('No image file selected.');
    }
  };
  return (
    <div>
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
                  value={newUserData ? newUserData.address.address : ''}
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
                  value={newUserData ? newUserData.address.city : ''}
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
    </div>
  );
};

export default AddUser;
