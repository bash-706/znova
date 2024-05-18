import styled from 'styled-components';
import Stats from './Stats';
import { useOrders } from '../features/orders/useOrders';
import { useServices } from '../features/services/useServices';
import { usePosts } from '../features/posts/usePosts';
import { useAllReviews } from '../features/reviews/useAllReviews';
import { useComments } from '../features/comments/useComments';
import { usePostCategories } from '../features/postCategories/usePostCategories';
import { useUsers } from '../features/users/useUsers';
import SalesChart from './SalesChart';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto auto 34rem;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { orders } = useOrders();
  const { services } = useServices('full');
  const { posts } = usePosts('full');
  const { reviews } = useAllReviews();
  const { comments } = useComments();
  const { postCategories } = usePostCategories();
  const { users } = useUsers();

  return (
    <StyledDashboardLayout>
      <Stats
        orders={orders}
        services={services}
        reviews={reviews}
        posts={posts}
        comments={comments}
        categories={postCategories}
        users={users}
      />
      <SalesChart orders={orders?.data} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
