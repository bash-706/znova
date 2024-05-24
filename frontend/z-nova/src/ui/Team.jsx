import styled from 'styled-components';
import Heading from './Heading';
import Paragraph from './Paragraph';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { createElement } from 'react';

const StyledTeam = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6rem 4rem;
`;

const StyledMember = styled.div`
  box-shadow: var(--shadow-lg);
  /* border: 1px solid var(--color-grey-800); */
  border-radius: 1.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.4rem;
  padding: 2rem 4rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  & img {
    width: 18rem;
    height: 18rem;
    border-radius: 50%;
    filter: saturate(0);
    transition: 0.1s;
  }

  &:hover img {
    filter: saturate(1);
  }

  &:hover div {
    right: 0;
  }
`;

const StyledSocial = styled.div`
  background: #eee;
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  right: -100%;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  border-radius: 1.6rem 0 0 1.6rem;
  padding: 0.4rem;
  transition: 0.2s ease;

  & a {
    padding: 1rem;
    color: #374151;
  }

  & a:hover {
    color: var(--color-brand-500);
  }
`;

const teamMembers = [
  {
    name: 'Adnan Akram',
    position: 'Cyber Security Expert',
    image: './member-1.jpg',
    socialLinks: [
      { icon: FaFacebook, link: '/home' },
      { icon: FaInstagram, link: '/about' },
      { icon: FaLinkedinIn, link: '/contact' },
      { icon: FaTwitter, link: '/services' },
    ],
  },
  {
    name: 'Ahsan Nadeem',
    position: 'Web Engineer',
    image: './member-2.jpg',
    socialLinks: [
      { icon: FaFacebook, link: '' },
      { icon: FaInstagram, link: '' },
      { icon: FaLinkedinIn, link: '' },
      { icon: FaTwitter, link: '' },
    ],
  },
  {
    name: 'Saqlain Haider',
    position: 'Graphics Designer',
    image: './member-3.jpg',
    socialLinks: [
      { icon: FaFacebook, link: '' },
      { icon: FaInstagram, link: '' },
      { icon: FaLinkedinIn, link: '' },
      { icon: FaTwitter, link: '' },
    ],
  },
  {
    name: 'Talha Abdul Satar',
    position: 'Videographer',
    image: './member-4.jpg',
    socialLinks: [
      { icon: FaFacebook, link: '' },
      { icon: FaInstagram, link: '' },
      { icon: FaLinkedinIn, link: '' },
      { icon: FaTwitter, link: '' },
    ],
  },
  {
    name: 'Abdul Haq Khalid',
    position: 'Computer Enthusiast',
    image: './member-5.jpg',
    socialLinks: [
      { icon: FaFacebook, link: '' },
      { icon: FaInstagram, link: '' },
      { icon: FaLinkedinIn, link: '' },
      { icon: FaTwitter, link: '' },
    ],
  },
  {
    name: 'Saad Bin Arshad',
    position: 'MERN Stack Developer',
    image: './member-6.jpg',
    socialLinks: [
      { icon: FaFacebook, link: '' },
      { icon: FaInstagram, link: '' },
      { icon: FaLinkedinIn, link: '' },
      { icon: FaTwitter, link: '' },
    ],
  },
  {
    name: 'Abdullah Zafar',
    position: 'Computer Engineer',
    image: './member-7.jpg',
    socialLinks: [
      { icon: FaFacebook, link: '' },
      { icon: FaInstagram, link: '' },
      { icon: FaLinkedinIn, link: '' },
      { icon: FaTwitter, link: '' },
    ],
  },
  {
    name: 'Mitusha Taki',
    position: 'Co-ordinator',
    image: './member-8.jpg',
    socialLinks: [
      { icon: FaFacebook, link: '' },
      { icon: FaInstagram, link: '' },
      { icon: FaLinkedinIn, link: '' },
      { icon: FaTwitter, link: '' },
    ],
  },
];

function Team() {
  return (
    <StyledTeam>
      {teamMembers.map((member, index) => (
        <StyledMember key={index}>
          <img src={member.image} alt={member.name} />
          <Heading as="h3" style={{ textAlign: 'center' }}>
            {member.name}
          </Heading>
          <Paragraph>{member.position}</Paragraph>
          <StyledSocial>
            {member.socialLinks.map((socialLink, index) => (
              <Link key={index} to={socialLink.link}>
                {createElement(socialLink.icon)}
              </Link>
            ))}
          </StyledSocial>
        </StyledMember>
      ))}
    </StyledTeam>
  );
}

export default Team;
