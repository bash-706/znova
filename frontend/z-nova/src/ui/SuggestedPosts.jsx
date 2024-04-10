import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledSuggestedPosts = styled.section`
  width: 100%;
  height: fit-content;
  box-shadow: var(--shadow-md);
  border-radius: 2rem;
  padding: 2rem;
  margin: 3rem 0;
  /* margin: 8.4rem 0; */
`;

const StyledPosts = styled.div`
  display: grid;
  gap: 2rem;
  margin: 2rem 0;
`;

function SuggestedPosts({ posts, tags }) {
  return (
    <StyledSuggestedPosts>
      <h2 style={{ fontSize: '1.8rem', fontWeight: '600', margin: '1rem 0' }}>
        Latest Articles
      </h2>
      <StyledPosts>
        {posts?.data?.map((post, index) => (
          <div key={index}>
            <Link to={`/blog/${post?.slug}`}>
              <div
                style={{
                  display: 'flex',
                  gap: '0 1.6rem',
                  flexWrap: 'nowrap',
                  alignItems: 'center',
                }}
              >
                <img
                  style={{
                    borderRadius: '1rem',
                    aspectRatio: '1/1',
                    objectFit: 'cover',
                    width: '20%',
                  }}
                  src={`http://127.0.0.1:8000/posts/${post?.image}`}
                  alt={post?.title}
                />
                <div>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 500 }}>
                    {post?.title}
                  </h3>
                  <span
                    style={{
                      fontSize: '1.2rem',
                      color: 'var(--color-grey-800)',
                      opacity: '60%',
                    }}
                  >
                    {new Date(post?.createdAt).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}

        <h2
          style={{ fontSize: '1.8rem', fontWeight: '600', margin: '1rem 0 0' }}
        >
          Tags
        </h2>
        {tags?.length === 0 ? (
          <p style={{ color: 'var(--color-grey-500)', fontSize: '1.5rem' }}>
            {`There is no tag for this post :(`}
          </p>
        ) : (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            {tags?.map((tag, index) => (
              <Link
                key={index}
                to="/"
                style={{
                  display: 'inline-block',
                  borderRadius: '0.8rem',
                  padding: '0.6rem 1.2rem',
                  background: 'var(--color-brand-600)',
                  color: '#fff',
                  fontSize: '1.4rem',
                }}
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </StyledPosts>
    </StyledSuggestedPosts>
  );
}

export default SuggestedPosts;
