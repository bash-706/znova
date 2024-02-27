import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useUser } from '../features/authentication/useUser';
import Sidebar from './Sidebar';
import Spinner from './Spinner';

const StyledAccountLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto;
`;

function AccountLayout() {
  const navigate = useNavigate();
  const { user, isLoading } = useUser();
  if (isLoading) return <Spinner />;

  if (!user) navigate('/auth/login');
  return (
    <StyledAccountLayout>
      <Sidebar />
      <Outlet />
    </StyledAccountLayout>
  );
}

export default AccountLayout;
