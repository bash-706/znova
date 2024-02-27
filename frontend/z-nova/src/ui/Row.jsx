import styled, { css } from 'styled-components';

const Row = styled.div`
  display: flex;

  ${(props) =>
    props.type === 'horizontal' &&
    css`
      align-items: center;
      justify-content: space-between;
    `}

  ${(props) =>
    props.type === 'vertical' &&
    css`
      flex-direction: column;
      gap: 2rem;
    `}

  ${(props) =>
    props.type === 'center' &&
    css`
      display: flex;\
      align-items: center;
      justify-content: center;
      height: 100%;
    `}
`;

Row.defaultProps = {
  type: 'vertical',
};

export default Row;
