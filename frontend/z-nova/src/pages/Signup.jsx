import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import SignupForm from '../features/authentication/SignupForm';
import Heading from '../ui/Heading';
import Logo from '../ui/Logo';

const SignupLayout = styled.main`
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

function Signup() {
  const navigate = useNavigate();
  return (
    <SignupLayout>
      <Logo height="6rem" margin="0 auto" onClick={() => navigate('/home')} />
      <Heading as="h4">Create a new account</Heading>
      <SignupForm />
    </SignupLayout>
  );
}

export default Signup;
