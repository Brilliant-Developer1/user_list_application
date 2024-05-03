/* eslint-disable react/prop-types */
import { MoreVertical, ChevronLast, ChevronFirst } from 'lucide-react';
import { useContext, createContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SidebarContext = createContext();

export default function SidebarWrapper({ children }) {
  const [expanded, setExpanded] = useState(true);
  const [wasExpanded, setWasexpanded] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth <= 640;
      const isBigScreen = window.innerWidth >= 640;
      if (isSmallScreen) {
        if (expanded) {
          setWasexpanded(true);
        }
        setExpanded(!isSmallScreen);
      }
      if (isBigScreen && wasExpanded) {
        setExpanded(true);
        setWasexpanded(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [wasExpanded, expanded]);

  return (
    <aside className="h-auto sm:h-screen fixed bottom-0 sm:bottom-auto sm:sticky top-auto sm:top-0 inset-x-0 sm:inset-x-auto z-50">
      <nav className="h-auto sm:h-full flex flex-row sm:flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="https://img.logoipsum.com/254.svg"
            className={`overflow-hidden transition-all ${
              expanded ? 'w-32' : 'w-0'
            }`}
            alt=""
          />
          <button
            onClick={() => setExpanded(curr => !curr)}
            className="p-1.5 rounded-lg hidden sm:block bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 flex flex-row sm:flex-col justify-center sm:justify-normal px-3">
            {children}
          </ul>
        </SidebarContext.Provider>

        <div className="sm:border-t flex p-3">
          <img
            src="https://ui-avatars.com/api/?background=7eedd5&color=024d3c&bold=true"
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? 'w-52 ml-3' : 'w-0'}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">John Doe</h4>
              <span className="text-xs text-gray-600">johndoe@gmail.com</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, alert, link, onClick }) {
  const { expanded } = useContext(SidebarContext);
  const handleClick = () => {
    if (onClick) {
      onClick(link);
    }
  };

  return (
    <li
      className={`
        relative py-2 sm:py-4 px-3 my-1 sm:my-2
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? 'bg-gradient-to-tr from-emerald-300 to-emerald-100 text-emerald-800'
            : 'hover:bg-indigo-50 text-gray-600'
        }
    `}
      onClick={handleClick}
    >
      <Link to={link} className="flex items-center flex-col sm:flex-row">
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            expanded ? 'w-52 ml-3' : 'w-0 hidden'
          }`}
        >
          {text}
        </span>
        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-emerald-400 ${
              expanded ? '' : 'top-2'
            }`}
          />
        )}

        {!expanded && (
          <div
            className={`
            rounded-md px-2 pt-1 sm:pt-0 py-0 sm:py-1 ml-0 sm:ml-6 sm:absolute sm:left-full sm:bg-indigo-100
             text-emerald-800 text-sm 
             sm:invisible sm:opacity-20 sm:-translate-x-3 sm:transition-all
             sm:group-hover:visible sm:group-hover:opacity-100 sm:group-hover:translate-x-0
      `}
          >
            {text}
          </div>
        )}
      </Link>
    </li>
  );
}

/* 
absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
*/
