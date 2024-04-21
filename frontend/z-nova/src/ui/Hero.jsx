import styled, { css } from 'styled-components';

const StyledHero = styled.section`
  ${(props) =>
    props.location === 'center' &&
    css`
      align-items: center;
      justify-content: center;
    `};

  ${(props) =>
    props.location === 'left' &&
    css`
      align-items: flex-start;
      justify-content: center;
    `};

  ${(props) =>
    props.location === 'right' &&
    css`
      align-items: flex-end;
      justify-content: center;
    `};

  background: ${(props) =>
    props.background ? `url(${props.background})` : `#fff`};
  height: ${(props) => (props.length ? `${props.length}` : '40vh')};
  display: flex;
  flex-direction: column;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
  filter: blur(0.1px);
  color: #efefef;

  @media (min-width: 84em) {
    font-size: 1.1em;
  }
`;

const StyledOverlay = styled.div`
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
`;

function Hero({ children, ...props }) {
  return (
    <StyledHero
      background={props.bg}
      length={props.length}
      location={props.location}
    >
      <StyledOverlay />
      <div style={{ zIndex: '100' }}>{children}</div>
    </StyledHero>
  );
}

export default Hero;
