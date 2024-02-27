import styled, { css } from 'styled-components';

const Paragraph = styled.p`
  ${(props) =>
    props.size === 'small' &&
    css`
      font-size: 14px;
      font-weight: 500;
      padding: 1.2rem 0;
    `}
  line-height: 1.2
`;

export default Paragraph;
