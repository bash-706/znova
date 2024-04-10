import styled from 'styled-components';
import useCreateBusinessSession from '../features/orders/useCreateBusinessSession';
import { useState } from 'react';

const PlansContainer = styled.section`
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
`;

const Plan = styled.div`
  background-color: var(--color-grey-100);
  padding: 2rem 3rem;
  border-radius: 5px;
  width: 30%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PlanTitle = styled.h3`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 6px;
  text-align: center;
`;

const PlanSubtitle = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
  text-align: center;
`;

const PlanList = styled.ul`
  list-style-type: circle;
  margin-top: 1rem;
`;

const PlanListItem = styled.li`
  margin-bottom: 2rem;
`;

const PlanButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const BusinessPlansSection = () => {
  const { createBusinessSession, status } = useCreateBusinessSession();
  const [button, setButton] = useState(null);

  const handleSession = (plan) => {
    createBusinessSession(plan);
  };

  return (
    <PlansContainer>
      <Plan>
        <h1 style={{ textAlign: 'center', fontSize: '3rem' }}>$100</h1>
        <PlanTitle>Basic Plan</PlanTitle>
        <PlanSubtitle>For Small Size Businesses</PlanSubtitle>
        <hr></hr>
        <PlanList>
          <PlanListItem>
            Basic website setup with essential pages (home, about, contact).
          </PlanListItem>
          <PlanListItem>
            Limited customization options for design and layout.
          </PlanListItem>
          <PlanListItem>Domain registration for 1 year.</PlanListItem>
          <PlanListItem>
            Hosting on shared server with basic resources.
          </PlanListItem>
          <PlanListItem>
            Essential features such as contact form, image gallery, light box,
            and basic SEO setup.
          </PlanListItem>
        </PlanList>
        <PlanButton
          onClick={() => {
            handleSession('basic');
            setButton('basic');
          }}
        >
          {(status === 'pending') & (button === 'basic')
            ? 'Processing...'
            : 'Buy Now'}
        </PlanButton>
      </Plan>
      <Plan>
        <h1 style={{ textAlign: 'center', fontSize: '3rem' }}>$200</h1>

        <PlanTitle>Standard Plan</PlanTitle>
        <PlanSubtitle>For Medium Size Businesses</PlanSubtitle>
        <hr></hr>
        <PlanList>
          <PlanListItem>
            Enhanced website setup with more pages and sections.
          </PlanListItem>
          <PlanListItem>
            More customization options for design and layout.
          </PlanListItem>
          <PlanListItem>Domain registration for 1 year.</PlanListItem>
          <PlanListItem>
            Hosting on dedicated server with better performance and resources.
          </PlanListItem>
          <PlanListItem>
            Advanced features such as e-commerce integration, blog setup, and
            social media integration.
          </PlanListItem>
        </PlanList>
        <PlanButton
          onClick={() => {
            handleSession('standard');
            setButton('standard');
          }}
        >
          {(status === 'pending') & (button === 'standard')
            ? 'Processing...'
            : 'Buy Now'}
        </PlanButton>
      </Plan>
      <Plan>
        <h1 style={{ textAlign: 'center', fontSize: '3rem' }}>$500</h1>
        <PlanTitle>Premium Plan</PlanTitle>
        <PlanSubtitle>For Large Scale Businesses</PlanSubtitle>
        <hr></hr>
        <PlanList>
          <PlanListItem>
            Unlimited pages and advanced features for enhanced functionality.
          </PlanListItem>
          <PlanListItem>
            Fully customized website design tailored to client&apos;s branding.
          </PlanListItem>
          <PlanListItem>Domain registration for 2 years.</PlanListItem>
          <PlanListItem>
            Hosting on dedicated server with top-tier resources and performance.
          </PlanListItem>
          <PlanListItem>
            Premium features such as custom integrations, advanced analytics,
            and SSL security.
          </PlanListItem>
        </PlanList>
        <PlanButton
          onClick={() => {
            handleSession('premium');
            setButton('premium');
          }}
        >
          {(status === 'pending') & (button === 'premium')
            ? 'Processing...'
            : 'Buy Now'}
        </PlanButton>
      </Plan>
    </PlansContainer>
  );
};

export default BusinessPlansSection;
