import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { HiOutlineUser, HiSparkles } from 'react-icons/hi2';
import { FiBox } from 'react-icons/fi';
import Logout from '../features/authentication/Logout';
import { useLogout } from '../features/authentication/useLogout';

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-brand-800);
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function Sidebar() {
  const { logout } = useLogout();
  return (
    <nav
      style={{
        background: 'var(--color-grey-100)',
        position: 'sticky',
        height: '100vh',
        top: '-0.8rem',
        paddingTop: '0.8rem',
      }}
    >
      <NavList>
        <li>
          <StyledNavLink to="/my-account">
            <HiOutlineUser />
            <span>My Account</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/orders">
            <FiBox />
            <span>My Orders</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/reviews">
            <HiSparkles />
            <span>My Reviews</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="#" onClick={logout}>
            <Logout />
            <span>Logout</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default Sidebar;
