import styled from 'styled-components';
import ScrollToTop from 'react-scroll-to-top';
import Heading from './Heading';
import Logo from './Logo';
import { Link } from 'react-router-dom';
import {
  HiChevronDoubleUp,
  HiHomeModern,
  HiComputerDesktop,
  HiInformationCircle,
  HiChatBubbleLeftRight,
  HiDevicePhoneMobile,
  HiEnvelope,
  HiMapPin,
  HiUserPlus,
  HiUserCircle,
  HiDocumentText,
  HiClipboardDocumentList,
} from 'react-icons/hi2';
import {
  FaDiscord,
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from 'react-icons/fa6';

const StyledFooter = styled.footer`
  background: var(--color-grey-0);
  color: var(--color-grey-800);
  padding: 2.6rem 5.2rem;
  border-top: 1px solid var(--color-grey-100);
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  justify-items: center;
`;

const NavList = styled.ul`
  display: flex;
  gap: 0.6rem;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
`;

const StyledNavLink = styled(Link)`
  &:link,
  &:visited {
    display: flex;
    gap: 0.8rem;

    color: var(--color-grey-800);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 0;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-brand-600);
    /* border-bottom: 2px solid var(--color-brand-600); */
    /* background-color: var(--color-grey-50); */
    /* border-radius: var(--border-radius-sm); */
  }

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-brand-500);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
  }
`;

const styles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
};

const StyledSocialIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 2.8rem;

  & svg {
    width: 1.8rem;
    height: 1.8rem;
    cursor: pointer;
    transition: all 0.3s;
  }

  & svg:hover,
  & svg:active {
    color: var(--color-brand-500);
  }
`;

function Footer() {
  return (
    <>
      <StyledFooter>
        <section style={styles}>
          <Logo height="2.5rem"/>
          <p>
            ZNOVA is an online, non-profitable website which provides digital
            services to its customers and is well known for its best work. we
            are dedicated to being your trusted source for all things tech.
          </p>
          <StyledSocialIcons>
            <a href="#fb" target="_blank">
              <FaFacebook />
            </a>
            <a href="#ig" target="_blank">
              <FaInstagram />
            </a>

            <a href="#yt" target="_blank">
              <FaYoutube />
            </a>

            <a href="#dc" target="_blank">
              <FaDiscord />
            </a>

            <a href="#li" target="_blank">
              <FaLinkedinIn />
            </a>
          </StyledSocialIcons>
        </section>
        <section style={styles}>
          <Heading as="h2">Useful Links</Heading>
          <NavList>
            <li>
              <StyledNavLink to="/home">
                <HiHomeModern />
                <span>Home</span>
              </StyledNavLink>
            </li>
            <li>
              <StyledNavLink to="/services">
                <HiComputerDesktop />
                <span>Service</span>
              </StyledNavLink>
            </li>
            <li>
              <StyledNavLink to="/auth/signup">
                <HiUserPlus />
                <span>Sign Up</span>
              </StyledNavLink>
            </li>
            <li>
              <StyledNavLink to="/auth/login">
                <HiUserCircle />
                <span>Sign In</span>
              </StyledNavLink>
            </li>
          </NavList>
        </section>
        <section style={styles}>
          <Heading as="h2">Company</Heading>
          <NavList>
            <li>
              <StyledNavLink to="/about">
                <HiInformationCircle />
                <span>About Us</span>
              </StyledNavLink>
            </li>
            <li>
              <StyledNavLink to="/contact">
                <HiChatBubbleLeftRight />
                <span>Contact Us</span>
              </StyledNavLink>
            </li>
            <li>
              <StyledNavLink to="/terms-and-conditions">
                <HiDocumentText />
                <span>Terms & Conditions</span>
              </StyledNavLink>
            </li>
            <li>
              <StyledNavLink to="/privacy-policy">
                <HiClipboardDocumentList />
                <span>Privacy Policy</span>
              </StyledNavLink>
            </li>
          </NavList>
        </section>
        <section style={styles}>
          <Heading as="h2">Contact</Heading>
          <NavList>
            <li>
              <StyledNavLink to="#">
                <HiDevicePhoneMobile />
                <span>+92 322-8423722</span>
              </StyledNavLink>
            </li>
            <li>
              <StyledNavLink to="#">
                <HiEnvelope />
                <span>info@znova.io</span>
              </StyledNavLink>
            </li>
            <li>
              <StyledNavLink to="#">
                <HiMapPin />
                <span>712 Royal Green Street, London.</span>
              </StyledNavLink>
            </li>
          </NavList>
        </section>
      </StyledFooter>
      <StyledFooter
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p>Copyright &copy; ZNova All Rights Reserved 2023</p>
      </StyledFooter>
      <ScrollToTop
        style={{ backgroundColor: 'var(--color-grey-600)' }}
        component={
          <HiChevronDoubleUp
            style={{
              fontSize: '2rem',
              strokeWidth: '0.3px',
              color: 'var(--color-grey-0)',
            }}
          />
        }
        smooth
        top={500}
      />
    </>
  );
}

export default Footer;
