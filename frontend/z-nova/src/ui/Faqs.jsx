import { useState } from 'react';
import styled from 'styled-components';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi2';
import Heading from './Heading';

const StyledFAQ = styled.div`
  margin: 2rem 0;
`;

const Question = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 1.4rem 0;
  border-bottom: 1px solid var(--color-grey-200);
  font-size: 1.6rem;
  font-weight: 500;
`;

const Answer = styled.div`
  padding: 1rem 0;
  font-size: 1.6rem;
  color: var(--color-grey-700);
`;

function FAQItem({ faq }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Question onClick={() => setIsOpen(!isOpen)}>
        <p>{faq?.question}</p>
        {isOpen ? <HiChevronUp /> : <HiChevronDown />}
      </Question>
      {isOpen && <Answer>{faq?.answer}</Answer>}
    </div>
  );
}

function FAQ({ faqs }) {
  return (
    <StyledFAQ>
      <Heading as="h3" style={{ marginBottom: '2rem', fontWeight: 600 }}>
        Frequently Asked Questions
      </Heading>
      {faqs?.map((faq, index) => (
        <FAQItem key={index} faq={faq} />
      ))}
    </StyledFAQ>
  );
}

export default FAQ;
