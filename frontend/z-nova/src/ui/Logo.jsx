import styled, { css } from 'styled-components';

import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';

const StyledLogo = styled.div`
  ${(props) =>
    props.hide === true &&
    css`
      @media (min-width: 1024px) {
        display: none;
      }
    `}
  display: flex;
  align-items: center;
  gap: 1.5rem;
  cursor: pointer;

  & img {
    width: auto;
  }
`;

function Logo({ height = '5rem', margin = '0', hide = false }) {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const src = isDarkMode ? '/logo-dark.png' : '/logo-light.png';
  return (
    <StyledLogo
      style={{ margin }}
      onClick={() => navigate('/home')}
      hide={hide}
    >
      <img style={{ height }} src={src} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
