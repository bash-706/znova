import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

/* const Spinner = styled.div`
  margin: 4.8rem auto;

  width: 6.4rem;
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(farthest-side, var(--color-brand-600) 94%, #0000) top/10px
      10px no-repeat,
    conic-gradient(#0000 30%, var(--color-brand-600));
  mask: radial-gradient(farthest-side, #0000 calc(100% - 10px), #000 0);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 10px), #000 0);
  animation: ${rotate} 1.5s infinite linear;
`; */

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const StyledSpinner = styled.div`
  aspect-ratio: 1;
  margin: 4.8rem auto;
  width: 6.4rem;
  height: 6.4rem;
  border-radius: 50%;
  display: inline-block;
  border-top: 4px solid var(--color-brand-600);
  border-right: 4px solid transparent;
  box-sizing: border-box;
  animation: ${rotate} 1s linear infinite;

  &:after {
    content: '';
    box-sizing: border-box;
    position: absolute;
    aspect-ratio: 1;
    left: 0;
    top: 0;
    width: 6.4rem;
    height: 6.4rem;
    border-radius: 50%;
    border-left: 4px solid var(--color-brand-500);
    border-bottom: 4px solid transparent;
    animation: ${rotate} 0.5s linear infinite reverse;
  }
`;

function Spinner() {
  return (
    <SpinnerContainer>
      <StyledSpinner />
    </SpinnerContainer>
  );
}

export default Spinner;
