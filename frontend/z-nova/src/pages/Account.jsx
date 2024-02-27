import Heading from '../ui/Heading';
import Row from '../ui/Row';
import UpdateUserDataForm from '../features/authentication/UpdateUserDataForm';
import UpdatePasswordForm from '../features/authentication/UpdatePasswordForm';
import { styled } from 'styled-components';
import DeleteAccountForm from '../features/authentication/DeleteAccountForm';

const StyledAccount = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  padding: 4rem 4rem 6rem;
`;

function Account() {
  return (
    <StyledAccount>
      {/* <Heading
          as="h1"
          style={{ textAlign: 'center', margin: '1rem 0 2rem 0' }}
        >
          My Account
        </Heading> */}
      <Row>
        <Heading as="h5" style={{ gap: '1.6rem' }}>
          {' '}
          Update Your Account
        </Heading>
        <UpdateUserDataForm />
      </Row>
      <Row>
        <Heading as="h5">Update Your Password</Heading>
        <UpdatePasswordForm />
      </Row>
      <Row>
        <Heading as="h5">Delete Your Account</Heading>
        <DeleteAccountForm />
      </Row>
    </StyledAccount>
  );
}

export default Account;
