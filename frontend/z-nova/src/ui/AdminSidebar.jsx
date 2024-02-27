import { useEffect, useState } from 'react';
import Logo from './Logo';
import styled from 'styled-components';
import { useWindowSize } from '@uidotdev/usehooks';
import {
  HiBars3,
  HiChatBubbleOvalLeftEllipsis,
  HiComputerDesktop,
  HiDocumentText,
  HiOutlineCalendarDays,
  HiUserGroup,
  HiXMark,
} from 'react-icons/hi2';
import { BiSolidDashboard } from 'react-icons/bi';
import { AiOutlineDashboard } from 'react-icons/ai';
import AdminNavItem from './AdminNavItem';
import AdminNavItemCollapse from './AdminNavItemCollapse';

const StyledSidebar = styled.section`
  display: flex;
  height: fit-content;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;

  @media (min-width: 1024px) {
    height: 100%;
    max-width: 280px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0;
  }
`;

const StyledSidebarContainer = styled.div`
  position: fixed;
  inset: 0;
  @media (min-width: 1024px) {
    position: static;
    width: 100%;
    height: 100%;
  }
`;

const StyledMenu = styled.div`
  & svg {
    width: 3rem;
    height: 3rem;
  }

  @media (min-width: 1024px) {
    display: none;
  }
`;

const StyledUnderlay = styled.div`
  position: fixed;
  inset: 0;
  background: #000;
  opacity: 50%;

  @media (min-width: 1024px) {
    display: none;
  }
`;

const StyledMainSidebar = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 5;
  width: 75%;
  overflow-y: auto;
  background: var(--color-grey-100);
  padding: 3rem;

  @media (min-width: 1024px) {
    position: static;
    width: 100%;
    height: 100%;
    padding: 4rem;
  }
`;

const StyledMenuItems = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const menuItems = [
  {
    title: 'Dashboard',
    link: '/admin',
    icon: <AiOutlineDashboard />,
    name: 'dashboard',
    type: 'link',
  },
  {
    title: 'Services',
    content: [
      { title: 'All Services', link: '/admin/services' },
      { title: 'New Service', link: '/admin/services/new' },
    ],
    icon: <HiComputerDesktop />,
    name: 'services',
    type: 'collapse',
  },
  {
    title: 'Orders',
    link: '/admin/orders',
    icon: <HiOutlineCalendarDays />,
    name: 'orders',
    type: 'link',
  },
  {
    title: 'Posts',
    content: [
      { title: 'All Posts', link: '/admin/posts' },
      { title: 'Add New Post', link: '/admin/posts/new' },
    ],
    icon: <HiDocumentText />,
    name: 'posts',
    type: 'collapse',
  },
  {
    title: 'Comments',
    link: '/admin/comments',
    icon: <HiChatBubbleOvalLeftEllipsis />,
    name: 'comments',
    type: 'link',
  },
  {
    title: 'Categories',
    content: [
      { title: 'New', link: '/admin/categories/new' },
      { title: 'Manage', link: '/admin/categories/manage' },
    ],
    icon: <BiSolidDashboard />,
    name: 'categories',
    type: 'collapse',
  },
  {
    title: 'Users',
    content: [
      { title: 'All Users', link: '/admin/users' },
      { title: 'Add New User', link: '/admin/users/new' },
      { title: 'Profile', link: '/admin/users/profile' },
    ],
    icon: <HiUserGroup />,
    name: 'users',
    type: 'collapse',
  },
];

function AdminSidebar() {
  const [isActiveMenu, setIsActiveMenu] = useState(false);
  const [activeNavName, setActiveNavName] = useState('dashboard');
  const windowSize = useWindowSize();

  const toggleMenuHandler = () => {
    setIsActiveMenu((prevState) => !prevState);
  };

  useEffect(() => {
    if (windowSize.width < 1024) {
      setIsActiveMenu(false);
    } else {
      setIsActiveMenu(true);
    }
  }, [windowSize.width]);

  return (
    <StyledSidebar>
      {/* Logo */}
      <Logo height="5rem" margin="0auto" hide={true} />

      {/* Hamburger Menu */}
      <StyledMenu>
        {isActiveMenu ? (
          <HiXMark onClick={toggleMenuHandler} />
        ) : (
          <HiBars3 onClick={toggleMenuHandler} />
        )}
      </StyledMenu>

      {/* Sidebar Container */}
      {isActiveMenu && (
        <StyledSidebarContainer>
          {/* Underlay */}
          <StyledUnderlay onClick={toggleMenuHandler} />
          {/* Sidebar */}
          <StyledMainSidebar>
            <Logo />
            <h2
              style={{
                marginTop: '2.5rem',
                color: 'var(--color-grey-600)',
                margin: '2rem 0',
                fontWeight: '500',
                fontSize: '2.4rem',
              }}
            >
              Main Menu
            </h2>
            {/* Menu Items */}
            <StyledMenuItems>
              {menuItems.map((item, index) =>
                item.type === 'link' ? (
                  <AdminNavItem
                    key={index}
                    link={item.link}
                    title={item.title}
                    icon={item.icon}
                    name={item.name}
                    activeNavName={activeNavName}
                    setActiveNavName={setActiveNavName}
                  />
                ) : (
                  <AdminNavItemCollapse
                    key={index}
                    content={item.content}
                    title={item.title}
                    icon={item.icon}
                    name={item.name}
                    activeNavName={activeNavName}
                    setActiveNavName={setActiveNavName}
                  />
                ),
              )}
            </StyledMenuItems>
          </StyledMainSidebar>
        </StyledSidebarContainer>
      )}
    </StyledSidebar>
  );
}

export default AdminSidebar;
