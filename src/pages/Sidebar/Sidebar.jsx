import { useEffect, useState } from 'react';
import SidebarWrapper, { SidebarItem } from './SidebarWrapper';
import { LayoutDashboard, UserCircle } from 'lucide-react';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState(
    localStorage.getItem('activeItem') || '/'
  );

  const handleItemClick = link => {
    setActiveItem(link);
    localStorage.setItem('activeItem', link);
  };

  useEffect(() => {
    const storedActiveItem = localStorage.getItem('activeItem');
    if (storedActiveItem) {
      setActiveItem(storedActiveItem);
    }
  }, []);
  return (
    <SidebarWrapper>
      <SidebarItem
        icon={<LayoutDashboard size={20} />}
        text="Dashboard"
        active={activeItem === '/'}
        onClick={() => handleItemClick('/')}
        link="/"
      />
      <SidebarItem
        icon={<UserCircle size={20} />}
        text="Users"
        active={activeItem === '/users'}
        onClick={() => handleItemClick('/users')}
        link="/users"
      />
    </SidebarWrapper>
  );
};

export default Sidebar;
