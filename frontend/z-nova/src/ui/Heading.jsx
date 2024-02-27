import styled, { css } from 'styled-components';

const Heading = styled.h1`
  ${(props) =>
    props.as === 'h1' &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === 'h2' &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}

    ${(props) =>
    props.as === 'h3' &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}

    ${(props) =>
    props.as === 'h4' &&
    css`
      font-size: 3rem;
      font-weight: 600;
      text-align: center;
      margin: 2rem 0;
    `}

    ${(props) =>
    props.as === 'h5' &&
    css`
      font-size: 2.6rem;
      font-weight: 600;
      margin: 0 0 1.6rem 0;
      text-align: center;
    `}

    ${(props) =>
    props.as === 'h6' &&
    css`
      font-size: 1.4rem;
      font-weight: 600;
      text-align: center;
      text-shadow: 0 0 1px var(--color-grey-900);
      /* background: var(--color-brand-500); */
      color: var(--color-grey-800);
      padding: 0.4rem 0.6rem;
      border-radius: 1rem;
    `}
    
  line-height: 1.4;
`;

export default Heading;
