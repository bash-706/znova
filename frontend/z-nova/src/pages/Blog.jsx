import styled from 'styled-components';
import PostCard from '../features/posts/PostCard';
import { usePosts } from '../features/posts/usePosts';
import PostCardSkeleton from '../ui/PostCardSkeleton';
import Hero from '../ui/Hero';
import Heading from '../ui/Heading';

const StyledBlog = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6rem 4rem;
  padding: 8rem;
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

function Blog() {
  const { posts, isLoading, error } = usePosts('all');
  if (error)
    return (
      <Center>
        <p>{error?.message}</p>
      </Center>
    );
  return (
    <>
      <Hero bg="12.jpg" location="center">
        <Heading
          as="h1"
          style={{
            paddingBottom: '0.4rem',
            textAlign: 'center',
            zIndex: 1,
          }}
        >
          Blog
        </Heading>
        <p style={{ zIndex: 1 }}>Crafting tommorow&apos;s digital experience</p>
      </Hero>
      <StyledBlog>
        {isLoading
          ? [...Array(3)].map((item, index) => <PostCardSkeleton key={index} />)
          : posts?.map((post) => <PostCard key={post?._id} post={post} />)}
      </StyledBlog>
    </>
  );
}

export default Blog;
