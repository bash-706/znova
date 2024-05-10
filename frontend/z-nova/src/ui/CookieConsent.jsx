import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ConsentContainer = styled.div`
  background-color: var(--color-grey-100);
  border: 1px solid #ced4da;
  padding: 1.5rem;
  border-radius: 5px;
  margin-bottom: 20px;
  width: 45rem;
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 10000;
`;

const Message = styled.p`
  margin: 1rem;
`;

const LearnMoreLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const AcceptButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;

const CookieConsent = () => {
  const [cookies, setCookie] = useCookies(['cookieConsent']);
  const giveCookieConsent = () => {
    console.log(cookies);
    setCookie('cookieConsent', true, { path: '/' });
  };

  return (
    <ConsentContainer>
      <Message>
        We use cookies to enhance your user experience. By using our website,
        you agree to our use of cookies.{'  '}
        <LearnMoreLink to="/privacy-policy">Learn more.</LearnMoreLink>
      </Message>
      <AcceptButton onClick={giveCookieConsent}>Accept</AcceptButton>
    </ConsentContainer>
  );
};

export default CookieConsent;
