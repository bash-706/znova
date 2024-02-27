import { Outlet } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import styled from 'styled-components';

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  /* padding: 4rem 4.8rem 6.4rem; */
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header style={{ boxShadow: '2px 2px 50px yellow' }} />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </StyledAppLayout>
  );
}

export default AppLayout;
