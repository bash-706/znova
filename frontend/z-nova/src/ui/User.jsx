import styled from 'styled-components';
import { useUser } from '../features/authentication/useUser';

const StyledCardUser = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.2rem;
`;

const StyledCardUserImage = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  overflow: hidden;
  border-radius: 50%;
`;

const StyledUserImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StyledUserName = styled.span`
  font-weight: 500;
  font-size: 16px;
  color: var(--color-grey-700);
`;

function User() {
  const { user } = useUser();

  return (
    <StyledCardUser>
      <StyledCardUserImage>
        <StyledUserImage src={`http://127.0.0.1:8000/users/${user.photo}`} />
      </StyledCardUserImage>{' '}
      <StyledUserName>{user?.name?.split(' ')[0]}</StyledUserName>
    </StyledCardUser>
  );
}

export default User;
