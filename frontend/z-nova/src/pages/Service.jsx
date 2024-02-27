import { useParams } from 'react-router-dom';
import { useService } from '../features/services/useService';
import { useCreateSession } from '../features/orders/useCreateSession';
import Spinner from '../ui/Spinner';
import Heading from '../ui/Heading';
import styled from 'styled-components';
import Row from '../ui/Row';
import { useMoveBack } from '../hooks/useMoveBack';
import { useCreateChat } from '../features/chats/useCreateChat';
import { useUser } from '../features/authentication/useUser';
import {
  HiChatBubbleOvalLeft,
  HiMapPin,
  HiMiniArrowLeft,
  HiOutlineArrowPath,
  HiOutlineClock,
  HiOutlineSparkles,
} from 'react-icons/hi2';
import { useState } from 'react';
import Button from '../ui/Button';
import ReviewForm from '../features/reviews/ReviewForm';
import ReviewList from '../features/reviews/ReviewList';
import Carousel from '../ui/Carousel';

const StyledLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 40rem;
  padding: 6.4rem 4.8rem 6.4rem;
  gap: 8rem;
`;

const StyledService = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 6.4rem;
`;

const StyledOverview = styled.div`
  display: grid;
  gap: 4rem;
`;

const StyledDescription = styled.div`
  line-height: 1.6;
  display: grid;
  gap: 2rem;

  & ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    list-style: circle;
  }
`;

const StyledCardUser = styled.section`
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-lg);
  padding: 3rem;
  border-radius: 1rem;
  gap: 3rem;
`;

const StyledUserMain = styled.div`
  display: flex;
  gap: 3rem;
  align-items: center;
`;

const StyledCardUserImage = styled.div`
  width: 8rem;
  height: 8rem;
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
  gap: 1rem;
`;

const StyledItems = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 1.4rem;
`;

const StyledItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;

  & span {
    font-weight: 500;
    font-size: 1.6rem;
  }
`;

const StyledPackages = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background: var(--color-grey-0);
  height: fit-content;
  border-radius: 1rem;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-grey-200);
  position: sticky;
  top: 0;
`;

const StyledTabItem = styled.div`
  cursor: pointer;
  border: none;

  &.tab {
    /* border: 1px solid var(--color-grey-900); */
    border-radius: 1rem;
    background-color: var(--color-grey-0);
    padding: 1rem 2rem;
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-500);
    transition: all 0.3s;
  }

  &.tab.active,
  &.tab:hover {
    background-color: var(--color-brand-500);
    color: var(--color-grey-0);
  }
`;

const StyledTabItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid var(--color-grey-200);
  padding-bottom: 1rem;
`;

const Review = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  padding: 4rem;
`;

function Service() {
  const { user } = useUser();
  const { createChat } = useCreateChat();
  const moveBack = useMoveBack();
  const { slug } = useParams();
  const { service, isLoading, error } = useService(slug);
  if (isLoading) return <Spinner />;
  if (error) return <Row type="center">{error.message}</Row>;

  const slides = [];
  service?.images?.map((image) => {
    slides.push({ src: `http://127.0.0.1:8000/services/${image}` });
  });

  return (
    <StyledLayout>
      <StyledService>
        <StyledOverview>
          <div>
            <Button
              size="small"
              variation="primary"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                marginBottom: '2rem',
              }}
              onClick={moveBack}
            >
              <HiMiniArrowLeft style={{ fontSize: '2rem' }} />
              Go Back
            </Button>

            <Heading as="h1" style={{ textAlign: 'justify' }}>
              {service?.name}
            </Heading>
          </div>
          <Carousel slides={slides} />
          {/* <img */}
        </StyledOverview>
        <StyledDescription>
          <Heading as="h2">Description</Heading>
          {/* {service?.description} */}
          <p dangerouslySetInnerHTML={{ __html: service?.description }} />
          <p>
            I am a passionate MERN stack web developer who can help you design
            and develop stunning, responsive and extremely fast web applications
            using the modern technologies.
          </p>
          <p>I will:</p>
          <ul>
            <li>
              Develop the API using the MVC architecture and Restful API
              structure.
            </li>
            <li>
              Carefully model the data and connect all the data sets according
              to all the good practices.
            </li>{' '}
            <li>
              Implement error handling, authentication, authorization, security,
              performance and much more in your API.
            </li>{' '}
            <li>
              Carefully choose the personality of your website and implement all
              the design ingredients accordingly.
            </li>{' '}
            <li>
              Consciously determine the layout components and structure them in
              a well mannered way according to the UI/UX.
            </li>{' '}
            <li>
              Deliberately manage state and build the UI using API according to
              the web design.
            </li>{' '}
            <li>
              Make the web app responsive and Search Engine Optimization ( SEO )
              based.
            </li>
          </ul>
          <p>
            So what are you waiting for, place the order and get your MERN stack
            web application developed now.
          </p>{' '}
          <p>
            Kindly discuss your project before placing the order.
            <p>Regards</p>
            <br />
            <span style={{ fontWeight: '500' }}>Adnan Chaudhary</span>
          </p>
        </StyledDescription>
        <StyledCardUser>
          <StyledUserMain>
            <StyledCardUserImage>
              <StyledUserImage
                src={`http://127.0.0.1:8000/users/${service?.user?.photo}`}
                alt={`Photo of ${service?.user?.name}`}
              />
            </StyledCardUserImage>
            <StyledUserInfo>
              <Heading as="h2">{service.user?.name}</Heading>
              <StyledItems>
                <StyledItem>
                  <HiMapPin />
                  <span>
                    {service.user?.location[0].toUpperCase() +
                      service.user?.location.slice(1)}
                  </span>
                </StyledItem>
                <StyledItem>
                  <HiChatBubbleOvalLeft />
                  <span>
                    I speak{' '}
                    {service.user?.languages.map(
                      (lang) => lang[0].toUpperCase() + lang.slice(1) + ', ',
                    )}
                  </span>
                </StyledItem>
                <StyledItem>
                  <HiOutlineSparkles />
                  <span>7 orders compeleted</span>
                </StyledItem>
              </StyledItems>
            </StyledUserInfo>
          </StyledUserMain>
          <div>
            <Heading as="h3" style={{ marginBottom: '1rem' }}>
              MERN Stack Web Application Developer
            </Heading>
            <div>{service.user?.biodata}</div>
          </div>
        </StyledCardUser>
        <Review>
          <Heading as="h3">
            Did you like our service? Rate us and let us know
          </Heading>
          <ReviewForm serviceId={service?.id} />
          <ReviewList serviceId={service?.id} />
        </Review>
      </StyledService>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <StyledPackages>
          <Tab contents={service?.packages} serviceId={service._id} />
        </StyledPackages>
        <Button
          style={{
            boxShadow: 'var(--shadow-md)',
            border: '1px solid var(--color-grey-200)',
            position: 'sticky',
            top: '36rem',
          }}
          size="medium"
          variation="secondary"
          onClick={() =>
            createChat({ user1: user?._id, user2: service?.user?._id })
          }
        >
          Contact {service?.user?.name.split(' ')[0]}
        </Button>{' '}
      </div>
    </StyledLayout>
  );
}
export default Service;

function Tab({ contents, serviceId }) {
  const [activeTab, setActiveTab] = useState(0);
  const name = ['Basic', 'Standard', 'Premium'];
  return (
    <>
      <StyledTabItems>
        {contents.map((content, index) => (
          <TabItem
            key={index}
            num={index}
            name={name[index]}
            activeTab={activeTab}
            onClick={setActiveTab}
          />
        ))}
      </StyledTabItems>

      <TabContent item={contents.at(activeTab)} serviceId={serviceId} />
    </>
  );
}

function TabItem({ num, name, activeTab, onClick }) {
  return (
    <StyledTabItem
      className={activeTab === num ? 'tab active' : 'tab'}
      onClick={() => onClick(num)}
    >
      {name}
    </StyledTabItem>
  );
}

function TabContent({ item, serviceId }) {
  const { createCheckoutSession, status } = useCreateSession();
  const handleSession = () => {
    createCheckoutSession({ serviceId, item });
  };
  return (
    <div
      style={{
        padding: '0 1.6rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }}
    >
      <h2 style={{ fontSize: '3.2rem', fontWeight: '600' }}>${item.price}</h2>
      <p style={{ color: 'var(--color-grey-700)' }}>
        <span
          style={{
            color: 'var(--color-grey-800)',
            fontWeight: '500',
            fontSize: '1.8rem',
            textShadow: '0 0 1px rgba(0,0,0,.6)',
          }}
        >
          {item.name}{' '}
        </span>
        {item.summary}
      </p>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: '2rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
          }}
        >
          <HiOutlineClock style={{ fontSize: '2rem' }} />
          <p>{item.duration} delivery</p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
          }}
        >
          <HiOutlineArrowPath />
          <p>
            {item.revisions} Revision{item.revisions > 1 ? 's' : ''}
          </p>
        </div>
      </div>
      <Button
        style={{ display: 'block', textAlign: 'center', fontWeight: '600' }}
        as="primary"
        onClick={handleSession}
      >
        {status === 'pending' ? 'Processing...' : 'Buy Now'}
      </Button>
    </div>
  );
}
