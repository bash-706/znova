import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import LoginForm from '../features/authentication/LoginForm';
import Heading from '../ui/Heading';
import Logo from '../ui/Logo';

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 54rem;
  align-content: center;
  justify-content: center;
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;

  & form {
    box-shadow: var(--shadow-md);
  }
`;

// const Img = styled.img`
//   height: 6rem;
//   width: auto;
//   margin: 0 auto;
// `;

function Login() {
  const navigate = useNavigate();
  return (
    <LoginLayout>
      <Logo height="6rem" margin="0 auto" onClick={() => navigate('/home')} />
      <Heading as="h4">Log in to your account</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
