import styled from 'styled-components';

const StyledPost = styled.div`
  border-radius: 1.6rem;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  width: 100%;
`;

const StyledImg = styled.div`
  width: 100%;
  height: 22rem;
  aspect-ratio: 16/9;
  background: var(--color-grey-200);
`;

const StyledTitle = styled.div`
  background: var(--color-grey-200);
  border-radius: 2rem;
  height: 0.8rem;
  margin-top: 1rem;
`;

function PostCardSkeleton() {
  return (
    <StyledPost>
      <StyledImg />
      <div style={{ padding: '2rem 2rem' }}>
        <div style={{ display: 'flex', gap: '1.4rem', alignItems: 'center' }}>
          <div
            style={{
              width: '3.8rem',
              height: '3.8rem',
              borderRadius: '50%',
              background: 'var(--color-grey-200)',
            }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              gap: '1rem',
            }}
          >
            <StyledTitle style={{ width: '10rem', marginTop: '0' }} />
            <StyledTitle style={{ width: '6rem', marginTop: '0' }} />
          </div>
        </div>
        <StyledTitle style={{ width: '24rem', margin: '2.6rem 0' }} />
        <StyledTitle style={{ width: '10rem', margin: '2rem 0' }} />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'nowrap',
            alignItems: 'center',
            marginTop: '3rem',
          }}
        >
          <StyledTitle style={{ width: '6rem', marginTop: '0' }} />
          <StyledTitle style={{ width: '10rem', marginTop: '0' }} />
        </div>
      </div>
    </StyledPost>
  );
}

export default PostCardSkeleton;
