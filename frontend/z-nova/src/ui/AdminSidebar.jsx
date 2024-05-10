import { useState } from 'react';
import Logo from './Logo';
import styled from 'styled-components';
import {
  HiChatBubbleOvalLeftEllipsis,
  HiComputerDesktop,
  HiDocumentText,
  HiSparkles,
  HiUserGroup,
} from 'react-icons/hi2';
import { FiBox } from 'react-icons/fi';
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
  height: 100%;
  max-width: 220px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0;
`;

const StyledSidebarContainer = styled.div`
  position: fixed;
  inset: 0;
  position: static;
  width: 100%;
  height: 100%;
`;

const StyledMainSidebar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 5;
  width: 19%;
  overflow-y: auto;
  background: var(--color-grey-100);
  padding: 3rem;
`;

const StyledMenuItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
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
      { title: 'Create Service', link: '/admin/services/new' },
    ],
    icon: <HiComputerDesktop />,
    name: 'services',
    type: 'collapse',
  },
  {
    title: 'Orders',
    link: '/admin/orders',
    icon: <FiBox />,
    name: 'orders',
    type: 'link',
  },
  {
    title: 'Reviews',
    link: '/admin/reviews',
    icon: <HiSparkles />,
    name: 'reviews',
    type: 'link',
  },
  {
    title: 'Posts',
    content: [
      { title: 'All Posts', link: '/admin/posts' },
      { title: 'Create Post', link: '/admin/posts/new' },
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
    link: '/admin/categories',
    icon: <BiSolidDashboard />,
    name: 'categories',
    type: 'link',
  },
  {
    title: 'Users',
    link: '/admin/users',
    icon: <HiUserGroup />,
    name: 'users',
    type: 'link',
  },
];

function AdminSidebar() {
  const [activeNavName, setActiveNavName] = useState('dashboard');

  return (
    <StyledSidebar>
      <Logo height="2rem" margin="0 auto" hide={true} />
      <StyledSidebarContainer>
        <StyledMainSidebar>
          <Logo height="2.4rem" margin="0.8rem 0 1.6rem 0" />
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
    </StyledSidebar>
  );
}

export default AdminSidebar;
