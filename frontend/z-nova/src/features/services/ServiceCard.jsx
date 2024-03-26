import styled from 'styled-components';
import { HiStar } from 'react-icons/hi2';
import { Link } from 'react-router-dom';

import Button from '../../ui/Button';

const StyledCard = styled.article`
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: 15px;
  overflow: hidden;
  /* padding: 1.25rem; */
  position: relative;
  transition: 0.2s ease-in;
  cursor: pointer;

  &:hover,
  &:focus-within {
    box-shadow:
      0 0 0 2px #16c79a,
      0 10px 60px 0 rgba(#000, 0.1);
    transform: translatey(-6px);
  }
`;

const StyledCardImage = styled.figure`
  border-radius: 10px 10px 0 0;
  overflow: hidden;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 22rem;
  max-width: 100%;
  display: block;
`;

const StyledCardBody = styled.main`
  margin: 1rem 2rem;
`;

const StyledCardTitle = styled.p`
  font-weight: 500;
  font-size: 1.6rem;
  padding: 0.6rem 0;
  line-height: 1.5;
  color: var(--color-grey-700);
  will-change: transform;
`;

const StyledCardUser = styled.section`
  display: flex;
  flex-direction: row;
  padding: 0.6rem 0 1rem 0;
  align-items: center;
`;

const StyledCardUserImage = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  overflow: hidden;
  border-radius: 50%;
`;

const StyledUserImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StyledUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;

  & span:nth-child(1) {
    font-weight: 500;
    font-size: 13px;
    color: var(--color-grey-700);
  }

  & span:nth-child(2) {
    color: var(--color-grey-500);
    font-size: 12px;
    font-weight: 500;
  }
`;

const StyledCardRating = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 0;

  & span {
    font-size: 14px;
  }

  & span:nth-of-type(1) {
    font-weight: 600;
  }

  & span:nth-of-type(2) {
    font-weight: 500;
    color: var(--color-grey-500);
  }
`;

const StyledCardPrice = styled.p`
  font-weight: 600;
  font-size: 15px;
`;

function ServiceCard({ service }) {
  return (
    <StyledCard>
      <Link to={`/services/${service?.slug}`} data-service-id={service._id}>
        <StyledCardImage>
          <StyledImage
            src={`http://127.0.0.1:8000/services/${service?.imageCover}`}
          />
        </StyledCardImage>
        <StyledCardBody>
          <StyledCardUser>
            <StyledCardUserImage>
              <StyledUserImage
                src={`http://127.0.0.1:8000/users/${service?.user?.photo}`}
                alt={`Photo of ${service?.user?.name}`}
              />
            </StyledCardUserImage>
            <StyledUserInfo>
              <span>{service.user?.name}</span>
              <span>{service.user?.username}</span>
            </StyledUserInfo>
          </StyledCardUser>
          <StyledCardTitle>{service?.name}</StyledCardTitle>
          <StyledCardRating>
            <HiStar />
            <span>{service?.ratingsAverage}</span>
            <span>({service.ratingsQuantity})</span>
          </StyledCardRating>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.6rem 0',
            }}
          >
            <StyledCardPrice>
              Starting From ${service?.packages[0]?.price}
            </StyledCardPrice>
            <p style={{fontSize: '1.5rem'}}>
              {service?.category}
            </p>
          </div>
        </StyledCardBody>
      </Link>
    </StyledCard>
  );
}

export default ServiceCard;
