import styled from 'styled-components';

import Logo from './Logo';
import MainNav from './MainNav';
// import SideNav from './SideNav.jsx';

const StyledHeader = styled.header`
  background: var(--color-grey-50);
  padding: 0rem 6rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2.4rem;
`;

function Header() {
  return (
    <StyledHeader>
      <Logo />
      <MainNav />
    </StyledHeader>
  );
}

export default Header;
