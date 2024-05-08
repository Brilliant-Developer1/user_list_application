import { BellDot, Bolt, Search } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="px-6 py-3 bg-white flex justify-between items-center border-b-2 border-slate-200">
      <div className="">
        <h1 className="text-black text-2xl font-semibold">Overview</h1>
      </div>
      <div className="flex gap-8">
        <div className="hidden lg:block ">
          <label className="input bg-slate-200 rounded-3xl input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow bg-slate-200 "
              placeholder="Search"
            />
            <Search color="#00d6bd" strokeWidth={1} />
          </label>
        </div>
        <div className="bg-slate-200 rounded-full p-3">
          <Bolt color="#878787" strokeWidth={1.5} />
        </div>
        <div className="bg-slate-200 rounded-full p-3">
          <BellDot color="#00d6bd" strokeWidth={1.5} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
