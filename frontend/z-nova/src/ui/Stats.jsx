import {
  HiChatBubbleOvalLeftEllipsis,
  HiComputerDesktop,
  HiDocumentText,
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiSparkles,
  HiUserGroup,
} from 'react-icons/hi2';
import Stat from './Stat';
import { BiSolidDashboard } from 'react-icons/bi';
import { formatCurrency } from '../utils/helpers';

function Stats({
  orders,
  services,
  reviews,
  posts,
  comments,
  users,
  categories,
}) {
  const numOrders = orders?.data?.length;
  const numServices = services?.data?.length;
  const numReviews = reviews?.data?.data?.length;
  const numPosts = posts?.data?.length;
  const numComments = comments?.length;
  const numUsers = users?.length;
  const numCategories = categories?.length;
  const salesAmount = orders?.data?.reduce((acc, cur) => acc + cur.price, 0);

  return (
    <>
      <Stat
        title="Orders"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numOrders}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(salesAmount)}
      />
      <Stat
        title="Services"
        color="red"
        icon={<HiComputerDesktop />}
        value={numServices}
      />
      <Stat
        title="Reviews"
        color="yellow"
        icon={<HiSparkles />}
        value={numReviews}
      />
      <Stat
        title="Posts"
        color="indigo"
        icon={<HiDocumentText />}
        value={numPosts}
      />
      <Stat
        title="Comments"
        color="blue"
        icon={<HiChatBubbleOvalLeftEllipsis />}
        value={numComments}
      />
      <Stat
        title="Users"
        color="green"
        icon={<HiUserGroup />}
        value={numUsers}
      />
      <Stat
        title="Categories"
        color="red"
        icon={<BiSolidDashboard />}
        value={numCategories}
      />
    </>
  );
}

export default Stats;
