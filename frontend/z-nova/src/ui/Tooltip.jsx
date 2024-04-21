import styled from 'styled-components';

const Tooltip = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 0.6rem;
  border-radius: 4px;
  z-index: 1;
  bottom: calc(100% + 0px);
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  display: ${(props) => (props.isVisible ? 'block' : 'none')};
`;

export default Tooltip;
