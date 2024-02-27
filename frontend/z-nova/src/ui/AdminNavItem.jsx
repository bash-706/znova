import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 2rem;
  font-size: 2rem;

  & svg {
    width: 2rem;
    height: 2rem;
  }
`;

function AdminNavItem({
  link,
  title,
  icon,
  name,
  activeNavName,
  setActiveNavName,
}) {
  return (
    <StyledNavLink
      to={link}
      style={
        name === activeNavName
          ? { fontWeight: 500, color: 'var(--color-brand-500)' }
          : { fontWeight: 300, color: 'var(--color-grey-500)' }
      }
      onClick={() => setActiveNavName(name)}
    >
      {icon}
      {title}
    </StyledNavLink>
  );
}

export default AdminNavItem;
