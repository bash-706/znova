import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { HiChevronDoubleRight } from 'react-icons/hi2';

const StyledBreadCrumbs = styled.div`
  display: flex;
  align-items: center;
  padding: ${(props) => props.padding};
  overflow-x: auto;
  white-space: nowrap;
  overflow-y: hidden;
`;

const StyledContainer = styled.div`
  color: var(--color-grey-900);
  opacity: 50%;
  display: flex;
  align-items: center;
`;

const StyledLink = styled(Link)`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 500px;
  display: inline-block;
  vertical-align: middle;
`;

const ChevronContainer = styled.span`
  padding: 1.5rem;
  display: flex;
  align-items: center;
`;

function Breadcrumbs({ data, padding = '3rem 0rem' }) {
  return (
    <StyledBreadCrumbs padding={padding}>
      {data.map((item, index) => (
        <StyledContainer key={index} title={item.name}>
          <StyledLink to={item.link}>{item.name}</StyledLink>
          {index !== data.length - 1 && (
            <ChevronContainer>
              <HiChevronDoubleRight />
            </ChevronContainer>
          )}
        </StyledContainer>
      ))}
    </StyledBreadCrumbs>
  );
}

export default Breadcrumbs;
