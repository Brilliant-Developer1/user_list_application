import { useEffect, useState } from 'react';
import chartImage from '../../assets/chartimage.png';
import getAllUsers from '../../data/getAllUsers';

const Hero = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUsers = await getAllUsers();
        const filteredUsers = fetchedUsers.slice(-3);
        setUsers(filteredUsers);
        // setIsLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        // setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <section className="container p-5">
      <div className=" flex flex-col xl:flex-row  items-center  gap-4 text-black">
        <div>
          <h2 className="text-xl font-semibold p-5">Weekly Activity</h2>
          <div className="max-w-5xl  p-3 rounded-3xl bg-gradient-to-r from-emerald-100 from-10% via-emerald-200 via-60% to-emerald-300 to-100%">
            <img className="w-auto rounded-xl" src={chartImage} alt="" />
          </div>
        </div>
        <div className="w-full max-w-full xl:max-w-96">
          <h2 className="text-xl font-semibold p-5">New Users</h2>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 rounded-3xl  gap-3 bg-gradient-to-r from-emerald-100 from-10% via-emerald-200 via-60% to-emerald-300 to-100%">
            {users.map(user => (
              <div key={user.id} className="card  ">
                <div className="flex items-center gap-1 p-5 ">
                  <div>
                    <div className="avatar pr-5">
                      <div className="w-16 mask mask-squircle">
                        <img className="object-top" src={user.image} />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h2 className="">
                      {user.firstName} {user.lastName}
                    </h2>
                    <p className="text-gray-700 text-sm">{user.company.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
