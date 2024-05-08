import chartImage from '../../assets/chartimage.png';

const Hero = () => {
  // Saved local storage users
  const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
  return (
    <section className="container p-5">
      <div className=" flex flex-col xl:flex-row  gap-4 text-black">
        <div>
          <h2 className="text-xl font-semibold p-5">Weekly Activity</h2>
          <div className="max-w-5xl  p-3 rounded-3xl bg-gradient-to-r from-emerald-100 from-10% via-emerald-200 via-60% to-emerald-300 to-100%">
            <img className="w-auto rounded-xl" src={chartImage} alt="" />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold p-5">New Users</h2>
          <div className="flex flex-col items-center lg:flex-row xl:flex-col gap-3">
            {existingUsers.map(user => (
              <div
                key={user.id}
                className="card w-80 max-w-96 shadow-xl bg-gradient-to-r from-emerald-100 from-10% via-emerald-200 via-60% to-emerald-300 to-100%"
              >
                <div className="flex items-center gap-1 p-5 ">
                  <div>
                    <div className="avatar pr-5">
                      <div className="w-24 mask mask-squircle">
                        <img src={user.image} />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h2 className="">
                      {user.firstName} {user.lastName}
                    </h2>
                    <p className="text-gray-700 text-sm">{user.companyName}</p>
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
