import styled from 'styled-components';
import ServiceCardSkeleton from '../../ui/ServiceCardSkeleton';
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

  if (error) return <p>{error.message}</p>;
  return (
    <>
      <StyledServiceList>
        {isLoading
          ? [...Array(3)].map((item, index) => (
              <ServiceCardSkeleton key={index} />
            ))
          : services?.data?.map((service) => (
              <ServiceCard key={service?._id} service={service} />
            ))}
      </StyledServiceList>
      <StyledFooter>
        <Pagination count={totalDocs} />
      </StyledFooter>
    </>
  );
}

export default ServicesList;
