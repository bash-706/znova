import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { HiChevronDoubleRight } from 'react-icons/hi2';

const StyledBreadCrumbs = styled.div`
  display: flex;
  align-items: center;
  padding: 3rem 0;
  overflow-x: auto;
  white-space: nowrap;
`;

const StyledContainer = styled.div`
  color: var(--color-grey-900);
  opacity: 50%;
`;

function Breadcrumbs({ data }) {
  return (
    <StyledBreadCrumbs>
      {data.map((item, index) => (
        <StyledContainer key={index}>
          <Link to={item.link}>{item.name}</Link>
          {index !== data.length - 1 && (
            <span style={{ padding: '1.5rem' }}>
              <HiChevronDoubleRight />
            </span>
          )}
        </StyledContainer>
      ))}
    </StyledBreadCrumbs>
  );
}

export default Breadcrumbs;
