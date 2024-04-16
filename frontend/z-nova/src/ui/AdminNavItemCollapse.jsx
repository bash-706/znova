import { useState } from 'react';
import { HiOutlineChevronDown } from 'react-icons/hi2';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 2rem;
  font-size: 2rem;
`;

const StyledSubItem = styled.div`
  flex-direction: column;
  gap: 1rem;
  padding: 0 0 0 4rem;
  margin-top: 1rem;
  font-size: 1.6rem;
  color: var(--color-grey-600);

  & svg {
    width: 20rem;
    height: 20rem;
  }
`;

function AdminNavItemCollapse({
  title,
  content,
  icon,
  name,
  activeNavName,
  setActiveNavName,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (name === activeNavName) {
      setIsOpen(!isOpen);
    } else {
      setActiveNavName(name);
      setIsOpen(true);
    }
  };

  return (
    <div onClick={handleClick}>
      <StyledItem
        style={
          name === activeNavName
            ? { fontWeight: '500', color: 'var(--color-brand-600)' }
            : { fontWeight: '400', color: 'var(--color-grey-500)' }
        }
      >
        <span>{icon}</span>
        <span>{title}</span>
        <HiOutlineChevronDown />
      </StyledItem>
      <StyledSubItem
        style={{
          display: name === activeNavName && isOpen ? 'flex' : 'none',
        }}
      >
        {content.map((item, index) => (
          <NavLink key={index} to={item.link}>
            {item.title}
          </NavLink>
        ))}
      </StyledSubItem>
    </div>
  );
}

export default AdminNavItemCollapse;
