import { NavLink } from 'react-router-dom';
import {
  HiHomeModern,
  HiComputerDesktop,
  HiInformationCircle,
  HiChatBubbleLeftRight,
  HiBars3,
  HiXMark,
  HiOutlineUser,
  HiGlobeAlt,
  HiDevicePhoneMobile,
  HiShieldCheck,
  HiOutlineChevronDown,
  HiUser,
  HiPhoto,
  HiOutlineEnvelope,
  HiDocumentText,
} from 'react-icons/hi2';
import { AiOutlineDashboard } from 'react-icons/ai';
import { useRef, useState } from 'react';

import { useUser } from '../features/authentication/useUser';
import DarkModeToggle from './DarkModeToggle';
import ButtonIcon from './ButtonIcon';
import Logout from '../features/authentication/Logout';
import User from './User';
import Dropdown from './Dropdown';
import useClickOutside from '../hooks/useClickOutside';
import { useSocket } from '../context/SocketContext';
import { unreadNotifications } from '../utils/unreadNotifications';
import styled from 'styled-components';

const StyledMobileNav = styled.nav`
  display: none;
  @media (max-width: 799px) {
    display: block;
  }
`;

const NavList = styled.ul`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;

  & .close-btn {
    display: none;
  }

  @media (max-width: 799px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    position: fixed;
    top: 0;
    height: 100%;
    width: 300px;
    background-color: var(--color-grey-200);
    padding: 20px 0 0 10px;
    box-shadow: 0 40px 60px rgba(0, 0, 0, 0.1);
    transition: 0.3s;
    z-index: 10;

    & .darkmode-btn {
      display: none;
    }

    & .close-btn {
      display: block;
    }
  }
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;

    color: var(--color-grey-800);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1rem 1.4rem;
    transition: all 0.3s;
  }

  &:hover:not(.services-dropdown) svg,
  &:active:not(.services-dropdown) svg,
  &.active:link:not(.services-dropdown) svg,
  &.active:visited:not(.services-dropdown) svg {
    color: var(--color-brand-600);
  }

  &:hover:not(.services-dropdown) span,
  &:active:not(.services-dropdown) span,
  &.active:link:not(.services-dropdown) span,
  &.active:visited:not(.services-dropdown) span {
    color: var(--color-brand-600);
  }

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-brand-500);
    transition: all 0.3s;
  }

  &.services-dropdown:hover svg,
  &.services-dropdown:active svg,
  &.services-dropdown.active:link svg,
  &.services-dropdown.active:visited svg {
    color: var(--color-brand-600);
  }

  &.services-dropdown:hover span,
  &.services-dropdown:active span,
  &.services-dropdown.active:link span,
  &.services-dropdown.active:visited span {
    color: var(--color-brand-600);
  }
`;

const DropdownSpan = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: 2px;
  right: 2px;
  background-color: var(--color-brand-600);
  font-size: 1rem;
  font-weight: 600;
  padding: 0.5rem;
  border-radius: 50%;
  width: 1.6rem;
  height: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate(50%, -50%);
`;

const dropdownServiceItems = [
  {
    to: 'services?category=web-development',
    icon: <HiGlobeAlt />,
    label: 'Web Development',
  },
  {
    to: 'services?category=app-development',
    icon: <HiDevicePhoneMobile />,
    label: 'App Development',
  },
  {
    to: 'services?category=cyber-security',
    icon: <HiShieldCheck />,
    label: 'Cyber Security',
  },
  {
    to: 'services?category=graphic-design',
    icon: <HiPhoto />,
    label: 'Graphic Design',
  },
];

function MainNav() {
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { notifications } = useSocket();
  const allUnreadNotifications = unreadNotifications(notifications);
  const dropdownRef = useRef(null);
  const { user } = useUser();

  const dropdownAccountItems = [
    (user?.role === 'admin' || user?.role === 'digitalist') && {
      to: '/admin',
      icon: <AiOutlineDashboard />,
      label: 'Admin Panel',
    },
    {
      to: '/my-account',
      icon: <HiUser />,
      label: 'My Account',
    },
    {
      to: '/auth/login',
      icon: <Logout />,
      label: 'Logout',
      fn: 'logout',
    },
  ].filter(Boolean);

  function toggleNavbar() {
    setIsNavOpen((prevOpen) => !prevOpen);
  }

  function toggleServicesDropdown() {
    setIsServicesDropdownOpen((prevOpen) => !prevOpen);
  }

  function toggleAccountDropdown() {
    setIsAccountDropdownOpen((prevOpen) => !prevOpen);
  }

  const handleOutsideClick = () => {
    if (dropdownRef.current) {
      setIsServicesDropdownOpen(false);
      setIsAccountDropdownOpen(false);
    }
  };

  useClickOutside(dropdownRef, handleOutsideClick);

  return (
    <>
      <nav>
        <NavList style={{ right: isNavOpen ? '0px' : '-300px' }}>
          <li className="close-btn">
            <ButtonIcon onClick={toggleNavbar}>
              <HiXMark style={{ height: '3rem', width: '3rem' }} />
            </ButtonIcon>
          </li>
          <li style={{ height: '100%' }}>
            <StyledNavLink to="/home" onClick={toggleNavbar}>
              <HiHomeModern />
              <span>Home</span>
            </StyledNavLink>
          </li>
          <li
            onMouseEnter={toggleServicesDropdown}
            onMouseLeave={() =>
              setTimeout(() => setIsServicesDropdownOpen(false), 400)
            }
            className={isServicesDropdownOpen ? 'services-dropdown' : ''}
          >
            <StyledNavLink to="/services" onClick={toggleNavbar}>
              <HiComputerDesktop />
              <DropdownSpan>
                Services <HiOutlineChevronDown />
              </DropdownSpan>
            </StyledNavLink>
            {isServicesDropdownOpen && (
              <Dropdown items={dropdownServiceItems} ref={dropdownRef} />
            )}
          </li>
          <li>
            <StyledNavLink to="/blog">
              <HiDocumentText />
              <span>Blog</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/about" onClick={toggleNavbar}>
              <HiInformationCircle />
              <span>About</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/contact" onClick={toggleNavbar}>
              <HiChatBubbleLeftRight />
              <span>Contact</span>
            </StyledNavLink>
          </li>

          {user && (
            <li>
              <StyledNavLink to="/inbox">
                <div
                  style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <HiOutlineEnvelope />
                  {allUnreadNotifications?.length > 0 && (
                    <NotificationBadge>
                      <span style={{ color: '#fff' }}>
                        {allUnreadNotifications?.length}
                      </span>
                    </NotificationBadge>
                  )}
                </div>
                <span>Inbox</span>
              </StyledNavLink>
            </li>
          )}

          <li onClick={toggleAccountDropdown}>
            {user ? (
              <>
                <StyledNavLink>
                  <DropdownSpan>
                    <User />
                  </DropdownSpan>
                </StyledNavLink>
                {isAccountDropdownOpen && (
                  <Dropdown items={dropdownAccountItems} ref={dropdownRef} />
                )}
              </>
            ) : (
              <StyledNavLink to="/auth/login">
                <ButtonIcon>
                  <HiOutlineUser />
                </ButtonIcon>
              </StyledNavLink>
            )}
          </li>
          <li className="darkmode-btn">
            <DarkModeToggle />
          </li>
        </NavList>
      </nav>
      <StyledMobileNav>
        <ul style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <li>
            <DarkModeToggle />
          </li>
          <li>
            <ButtonIcon onClick={toggleNavbar}>
              <HiBars3 />
            </ButtonIcon>
          </li>
        </ul>
      </StyledMobileNav>
    </>
  );
}

export default MainNav;
