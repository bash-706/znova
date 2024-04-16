import styled from 'styled-components';
import Heading from './Heading';

const StyledNoChats = styled.section`
  display: flex;
  align-items: center;
  padding: 6.4rem 4.8rem 6.4rem;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  min-height: calc(100vh - 5.5rem);
`;

const StyledInnerBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const StyledParagraph = styled.p`
  font-size: 1.8rem;
  color: var(--color-grey-600);
`;

const StyledImage = styled.img`
  border-radius: 1rem;
  width: 300px;
`;

export default function NoChats() {
  return (
    <StyledNoChats>
      <StyledImage src="ds-21.png" />
      <StyledInnerBox>
        <Heading as="h1" style={{ color: '#000' }}>
          Your Inbox is empty
        </Heading>
        <StyledParagraph>
          No new messages. You&apos;re all caught up!
        </StyledParagraph>
      </StyledInnerBox>
    </StyledNoChats>
  );
}
