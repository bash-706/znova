import styled from 'styled-components';
import Spinner from '../../ui/Spinner';
import ServiceCard from './ServiceCard';
import { useServices } from './useServices';
import Pagination from '../../ui/Pagination';

const StyledServiceList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6rem;
`;

const StyledFooter = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  /* justify-content: center; */
  padding: 1.2rem;
`;

function ServicesList() {
  const { services, isLoading, error, totalDocs } = useServices();

  if (isLoading) return <Spinner />;
  if (error) return <p>{error.message}</p>;
  return (
    <>
      <StyledServiceList>
        {services?.data?.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </StyledServiceList>
      <StyledFooter>
        <Pagination count={totalDocs} />
      </StyledFooter>
    </>
  );
}

export default ServicesList;
