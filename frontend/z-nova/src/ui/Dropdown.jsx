import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useLogout } from '../features/authentication/useLogout';

const StyledDropdown = styled.ul`
  display: block;
  position: absolute;
  z-index: 10;
  background: var(--color-grey-0);
  padding: 1rem;
  width: auto;
  top: 5rem;
  padding-right: 1rem;
  border-radius: 0 0 1rem 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  & li {
    padding: 1rem;
    border-bottom: var(--color-grey-50);
  }

  & a {
    display: flex;
    gap: 1rem;
  }

  & svg {
    width: 2rem;
    height: 2rem;
    transition: all 0.3s;
  }

  a:hover,
  a:hover svg {
    color: var(--color-brand-600);
  }
`;

const Dropdown = forwardRef(({ items }, ref) => {
  const { logout } = useLogout();

  return (
    <StyledDropdown ref={ref}>
      {items.map((item) => (
        <li onClick={item.fn === 'logout' ? logout : () => {}} key={item.label}>
          <Link to={item.to}>
            {item.icon}
            <span>{item.label}</span>
          </Link>
        </li>
      ))}
    </StyledDropdown>
  );
});

Dropdown.displayName = 'Dropdown';

export default Dropdown;
