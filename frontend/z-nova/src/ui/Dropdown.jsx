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
  top: 6rem;
  padding-right: 1rem;
  border-radius: 0 0 1rem 1rem;

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
`;

const Dropdown = forwardRef(({ items }, ref) => {
  const { logout } = useLogout();

  // if (!isOpen) {
  //   return null;
  // }

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
