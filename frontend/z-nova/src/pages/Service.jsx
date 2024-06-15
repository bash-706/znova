import { useParams } from 'react-router-dom';
import { useService } from '../features/services/useService';
import { useCreateSession } from '../features/orders/useCreateSession';
import Spinner from '../ui/Spinner';
import Heading from '../ui/Heading';
import styled from 'styled-components';
import FAQ from '../ui/Faqs';
import { useCreateChat } from '../features/chats/useCreateChat';
import { useUser } from '../features/authentication/useUser';
import {
  HiChatBubbleOvalLeft,
  HiMapPin,
  HiOutlineArrowPath,
  HiOutlineClock,
  HiOutlineSparkles,
} from 'react-icons/hi2';
import { useEffect, useState } from 'react';
import Button from '../ui/Button';
import Carousel from '../ui/Carousel';
import Breadcrumbs from '../ui/Breadcrumbs';
import useServiceFaqs from '../features/faqs/useServiceFaqs';
import ReviewsContainer from '../features/reviews/ReviewsContainer';
import Editor from '../ui/Editor';

const StyledLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 40rem;
  padding: 6.4rem 4.8rem 6.4rem;
  gap: 5rem;
`;

const StyledService = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
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
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: var(--color-grey-0);
  height: fit-content;
  border-radius: 1rem;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-grey-200);
`;

const StyledTabItem = styled.div`
  cursor: pointer;
  border: none;

  &.tab {
    border-radius: 1rem;
    background-color: var(--color-grey-0);
    padding: 1rem 2rem;
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--color-grey-500);
    transition: all 0.3s;
  }

  &.tab.active,
  &.tab:hover {
    background-color: var(--color-brand-500);
    color: #fff;
  }
`;

const StyledTabItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid var(--color-grey-200);
  padding-bottom: 1rem;
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

function Service() {
  const [breadcrumbsData, setBreadcrumbsData] = useState([]);
  const { user } = useUser();
  const { createChat } = useCreateChat();
  const { slug } = useParams();
  const { service, isLoading, error, isSuccess } = useService(slug);
  const slides = [];
  service?.images?.map((image) => {
    slides.push({ src: `http://127.0.0.1:8000/services/${image}` });
  });
  const { faqs } = useServiceFaqs(service?._id);

  console.log(service?.description);

  useEffect(() => {
    if (isSuccess) {
      setBreadcrumbsData([
        {
          name: 'Home',
          link: '/',
        },
        {
          name: 'Services',
          link: '/services',
        },
        {
          name: `${service?.name}`,
          link: `/services/${service?.slug}`,
        },
      ]);
    }
  }, [isSuccess, service]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading)
    return (
      <Center>
        <Spinner />
      </Center>
    );

  if (error)
    return (
      <Center>
        <p>{error?.message}</p>
      </Center>
    );
  return (
    <StyledLayout>
      <StyledService>
        <StyledOverview>
          <Breadcrumbs data={breadcrumbsData} padding={'0rem'} />
          <Carousel slides={slides} />
          <Heading as="h1" style={{ textAlign: 'justify', fontSize: '2.6rem' }}>
            {service?.name}
          </Heading>
          {/* <img */}
        </StyledOverview>
        <StyledDescription>
          <Heading as="h2">Description</Heading>
          <div
            style={{
              width: '100%',
              marginTop: '2rem',
              color: 'var(--color-grey-700)',
            }}
          >
            {!isLoading && !error && (
              <Editor content={service?.description} editable={false} />
            )}
          </div>
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
              <Heading as="h2">{service?.user?.name}</Heading>
              <StyledItems>
                <StyledItem>
                  <HiMapPin />
                  <span>{service?.user?.country}</span>
                </StyledItem>
                <StyledItem>
                  <HiChatBubbleOvalLeft />
                  <span>
                    I speak{' '}
                    {service?.user?.languages?.map(
                      (lang) => lang[0]?.toUpperCase() + lang?.slice(1) + ', ',
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
        {faqs?.length > 0 && <FAQ faqs={faqs} />}
        <ReviewsContainer serviceId={service?.id} reviews={service?.reviews} />
      </StyledService>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <div style={{ position: 'sticky', width: '100%', top: 0 }}>
          <StyledPackages>
            <Tab contents={service?.packages} serviceId={service._id} />
          </StyledPackages>
          <Button
            style={{
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--color-grey-200)',
              width: '100%',
              marginTop: '1rem',
            }}
            size="medium"
            variation="secondary"
            onClick={() =>
              createChat({ user1: user?._id, user2: service?.user?._id })
            }
          >
            Contact {service?.user?.name.split(' ')[0]}
          </Button>
        </div>
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
        gap: '1.6rem',
      }}
    >
      <h2 style={{ fontSize: '2.6rem', fontWeight: '600' }}>${item.price}</h2>
      <p style={{ color: 'var(--color-grey-700)' }}>
        <span
          style={{
            color: 'var(--color-grey-800)',
            fontWeight: '500',
            fontSize: '1.6rem',
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
          gap: '1.4rem',
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
        style={{
          display: 'block',
          textAlign: 'center',
          fontWeight: '500',
          cursor: 'pointer',
          marginTop: '1rem',
        }}
        as="primary"
        onClick={handleSession}
      >
        {status === 'pending' ? 'Processing...' : 'Buy Now'}
      </Button>
    </div>
  );
}
