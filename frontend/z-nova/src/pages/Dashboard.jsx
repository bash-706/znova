import DashboardLayout from '../ui/DashboardLayout';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

function Dashboard() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1" style={{ fontWeight: '500', fontSize: '2rem' }}>
          Dashboard
        </Heading>
      </Row>
      <DashboardLayout />
    </>
  );
}

export default Dashboard;
