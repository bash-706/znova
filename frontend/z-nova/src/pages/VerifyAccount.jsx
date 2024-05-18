import { styled } from 'styled-components';
import { useParams } from 'react-router-dom';
import { useVerify } from '../features/authentication/useVerify';
import { useEffect, useState } from 'react';
import Spinner from '../ui/Spinner';

const StyledVerifyAccount = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f4f8;
`;

const MessageCard = styled.div`
  padding: 20px 30px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-size: 1.2rem;
  color: #333;

  h1 {
    font-size: 1.5rem;
    font-weight: 500;
  }

  p {
    margin: 0;
  }
`;

function VerifyAccount() {
  const { token } = useParams();
  const [message, setMessage] = useState('');
  const { verifyAccount, isLoading } = useVerify({
    onSuccess: () => setMessage('Account Verified Successfully!'),
    onError: () =>
      setMessage(
        'Account Verification Failed. Link is Invalid or has Expired.',
      ),
  });

  useEffect(() => {
    if (token) {
      verifyAccount(token);
    }
  }, [verifyAccount, token]);

  if (isLoading) return <Spinner />;

  return (
    <StyledVerifyAccount>
      <MessageCard>
        <h1>{message}</h1>
      </MessageCard>
    </StyledVerifyAccount>
  );
}

export default VerifyAccount;
