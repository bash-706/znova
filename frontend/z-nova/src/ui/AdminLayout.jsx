import styled from 'styled-components';
import AdminSidebar from './AdminSidebar';
import Spinner from './Spinner';
import { Outlet, useNavigate } from 'react-router-dom';
import { useUser } from '../features/authentication/useUser';

const StyledAdminPanel = styled.div`
  display: flex;
  height: fit-content;
`;

const StyledMain = styled.main`
  background: var(--color-grey-0);
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 4rem;
  gap: 2rem;

  @media (min-width: 1024px) {
    /* padding: 3rem; */
  }
`;

const StyledCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

function AdminLayout() {
  const navigate = useNavigate();
  const { user, isLoading } = useUser();

  if (user?.role !== 'admin') {
    navigate('/');
    return null;
  }

  if (isLoading) {
    return (
      <StyledCenter>
        <Spinner />
      </StyledCenter>
    );
  }

  return (
    <StyledAdminPanel>
      <AdminSidebar />
      <StyledMain>
        <Outlet />
      </StyledMain>
    </StyledAdminPanel>
  );
}

export default AdminLayout;
