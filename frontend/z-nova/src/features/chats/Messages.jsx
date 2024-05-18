import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Message from './Message';

const StyledMessages = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 2rem 4rem;
`;

function Messages({ messages, user }) {
  const scroll = useRef();

  useEffect(() => {
    scroll.current?.scrollIntoView({ behaviour: 'smooth' });
  }, [messages]);

  return (
    <StyledMessages>
      {messages?.map((message, index) => {
        return (
          <div
            key={index}
            ref={scroll}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '1rem',
              // alignItems:
              // message?.senderId === user?._id ? 'flex-end' : 'flex-start',
            }}
          >
            <Message message={message} user={user} />
          </div>
        );
      })}
    </StyledMessages>
  );
}

export default Messages;
