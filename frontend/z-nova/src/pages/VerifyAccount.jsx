import { styled } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { verifyAccount } from '../services/apiAuth';
import { useEffect } from 'react';
import { useState } from 'react';
// import { useVerify } from '../features/authentication/useVerify';
// import Spinner from '../ui/Spinner';

const StyledVerifyAccount = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

function VerifyAccount() {
  const navigate = useNavigate();
  const { token } = useParams();
  //   const { verifyAccount, isLoading } = useVerify();
  //   verifyAccount(token);
  //   if (isLoading) return <Spinner />;
  const [message, setMessage] = useState('');
  useEffect(
    function () {
      async function verify() {
        const res = await verifyAccount(token);
        if (res.status === 'success') {
          setMessage(
            'Account Verified Successfully. Now you can feel free to use our services.',
          );
          setTimeout(() => {
            navigate('/home');
          }, 2000);
        } else {
          setMessage('Account Verification Failed!');
        }
      }
      verify();
    },
    [token, navigate],
  );

  return <StyledVerifyAccount>{message}</StyledVerifyAccount>;
}

export default VerifyAccount;
