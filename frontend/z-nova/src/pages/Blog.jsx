import styled from 'styled-components';
import PostCard from '../features/posts/PostCard';
import { usePosts } from '../features/posts/usePosts';
import PostCardSkeleton from '../ui/PostCardSkeleton';
import Hero from '../ui/Hero';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import ServiceOperations from '../features/services/ServiceOperations';
import Pagination from '../ui/Pagination';

const StyledBlog = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 6.4rem;
  padding: 6.4rem 8rem 6.4rem;
  /* padding: 4rem 8rem; */
`;

const StyledBlogPosts = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6rem 4rem;
  // padding: 8rem;
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const StyledFooter = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  /* justify-content: center; */
  padding: 1.2rem;
`;

function Blog() {
  const { posts, isLoading, error, totalDocs } = usePosts('all');
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
        <Row type="horizontal">
          <Heading as="h3" style={{ fontSize: '2.8rem' }}>
            All Posts
          </Heading>
          <ServiceOperations />
        </Row>
        <StyledBlogPosts>
          {isLoading
            ? [...Array(3)].map((item, index) => (
                <PostCardSkeleton key={index} />
              ))
            : posts?.data?.map((post) => (
                <PostCard key={post?._id} post={post} />
              ))}
        </StyledBlogPosts>
        <StyledFooter>
          <Pagination count={totalDocs} />
        </StyledFooter>
      </StyledBlog>
    </>
  );
}

export default Blog;
