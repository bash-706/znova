import styled, { css } from 'styled-components';

const StyledFormRow = styled.div`
  ${(props) =>
    props.type === 'login' &&
    css`
      grid-template-columns: auto;
    `}

  ${(props) =>
    props.type === 'signup' &&
    css`
      grid-template-columns: 100px 1fr;
    `}
  display: grid;
  align-items: center;
  gap: 1.8rem;
  position: relative;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

const StyledStar = styled.span`
  color: #ff2020;
  font-weight: 500;
`;

function FormRow({ label, error, children, star, style }) {
  return (
    <StyledFormRow style={style}>
      {label && (
        <Label htmlFor={children?.props?.id}>
          {label} {star ? <StyledStar>{star}</StyledStar> : ''}
        </Label>
      )}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
