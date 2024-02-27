import styled from 'styled-components';
import Heading from '../../ui/Heading';
import { Link } from 'react-router-dom';

const StyledPost = styled.div`
  border-radius: 1.6rem;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  width: 100%;
`;

const StyledImg = styled.img`
  width: 100%;
  height: 24rem;
  object-fit: cover;
  object-position: center;
`;

function PostCard({ post }) {
  return (
    <Link to={`/blog/${post?.slug}`}>
      <StyledPost>
        <StyledImg
          src={`http://127.0.0.1:8000/posts/${post?.image}`}
          alt={post?.title}
        />
        <div style={{ padding: '1rem 2rem' }}>
          <Heading as="h2" style={{ color: 'var(--color-grey-800)' }}>
            {post?.title}
          </Heading>
          <p
            style={{
              fontSize: '1.5rem',
              color: 'var(--color-grey-600)',
              margin: '1.6rem 0',
            }}
          >
            {post?.caption}
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'nowrap',
              alignItems: 'center',
              marginTop: '3rem',
            }}
          >
            <div
              style={{ display: 'flex', gap: '1.4rem', alignItems: 'center' }}
            >
              <img
                src={`http://127.0.0.1:8000/users/${post?.user?.photo}`}
                alt="blog-writer"
                style={{
                  width: '3.8rem',
                  height: '3.8rem',
                  borderRadius: '50%',
                  border: '1.6px solid var(--color-brand-500)',
                }}
              />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  gap: '0rem',
                }}
              >
                <h4 style={{ fontSize: '1.4rem', fontWeight: '600' }}>
                  {post?.user?.name}
                </h4>
                <span style={{ fontSize: '1.4rem' }}>
                  {post?.user?.username}
                </span>
              </div>
            </div>
            <span
              style={{ fontSize: '1.4rem', color: 'var(--color-grey-600)' }}
            >
              {new Date(post?.createdAt).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>
      </StyledPost>
    </Link>
  );
}

export default PostCard;
