import styled from 'styled-components';
import PostCard from '../features/posts/PostCard';
import { usePosts } from '../features/posts/usePosts';
import PostCardSkeleton from './PostCardSkeleton';

const StyledArticles = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8rem 4rem;
  padding: 1rem 0;
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

function Articles() {
  const { posts, isLoading, error } = usePosts('latest');
  if (error)
    return (
      <Center>
        <p>{error?.message}</p>
      </Center>
    );
  return (
    <StyledArticles>
      {isLoading
        ? [...Array(3)].map((item, index) => <PostCardSkeleton key={index} />)
        : posts?.data?.map((post) => <PostCard key={post?._id} post={post} />)}
    </StyledArticles>
  );
}

export default Articles;
