import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

import GlobalStyles from './styles/GlobalStyles';
import AppLayout from './ui/AppLayout';
import HomePage from './pages/HomePage';
import Services from './pages/Services';
import Service from './pages/Service';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import Contact from './pages/Contact';
import PageNotFound from './pages/PageNotFound';
import Account from './pages/Account';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CookiePolicy from './pages/CookiePolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import Orders from './pages/Orders';
import Order from './pages/Order';
import Reviews from './pages/Reviews';
import styled from 'styled-components';
import { DarkModeProvider } from './context/DarkModeContext';
import { SocketProvider } from './context/SocketContext';
import ProtectedRoute from './ui/ProtectedRoute';
import VerifyAccount from './pages/VerifyAccount';
import AccountLayout from './ui/AccountLayout';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Chat from './pages/Chat';
import Blog from './pages/Blog';
import Article from './pages/Article';
import AdminLayout from './ui/AdminLayout';
import AdminComments from './ui/AdminComments';
import AdminManagePosts from './ui/AdminManagePosts';
import AdminNewPost from './ui/AdminNewPost';
import AdminOrders from './ui/AdminOrders';
import AdminUsers from './ui/AdminUsers';
import AdminPostCategories from './ui/AdminPostCategories';
import AdminServiceCategories from './ui/AdminServiceCategories';
import AdminNewService from './ui/AdminNewService';
import AdminManageServices from './ui/AdminManageServices';
import AdminEditPost from './ui/AdminEditPost';
import AdminReviews from './ui/AdminReviews';
import Dashboard from './pages/Dashboard';
import ActivateAccount from './pages/ActivateAccount';
import { useEffect } from 'react';

const StyledApp = styled.div`
  height: 100vh;
  background-color: var(--color-grey-0);
`;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <StyledApp>
          <GlobalStyles />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route
                element={
                  <ProtectedRoute>
                    <SocketProvider>
                      <AppLayout />
                    </SocketProvider>
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="home" />} />
                <Route path="home" element={<HomePage />} />
                <Route path="services" element={<Services />} />
                <Route path="services/:slug" element={<Service />} />
                <Route path="blog" element={<Blog />} />
                <Route path="blog/:slug" element={<Article />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="inbox" element={<Chat />} />
                <Route path="orders/:orderId" element={<Order />} />
                <Route
                  path="terms-and-conditions"
                  element={<TermsAndConditions />}
                />
                <Route path="privacy-policy" element={<PrivacyPolicy />} />
                <Route path="cookie-policy" element={<CookiePolicy />} />
                <Route element={<AccountLayout />}>
                  <Route path="my-account" element={<Account />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="reviews" element={<Reviews />} />
                </Route>
              </Route>
              <Route path="auth/signup" element={<Signup />} />
              <Route path="auth/login" element={<Login />} />
              <Route
                path="/verify-account/:token"
                element={<VerifyAccount />}
              />
              <Route
                path="/activate-account/:token"
                element={<ActivateAccount />}
              />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route
                path="reset-password/:resetToken"
                element={<ResetPassword />}
              />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="comments" element={<AdminComments />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="reviews" element={<AdminReviews />} />
                <Route path="posts/new" element={<AdminNewPost />} />
                <Route path="posts" element={<AdminManagePosts />} />
                <Route path="posts/edit/:slug" element={<AdminEditPost />} />
                <Route path="services/new" element={<AdminNewService />} />
                <Route path="services" element={<AdminManageServices />} />
                <Route
                  path="post-categories"
                  element={<AdminPostCategories />}
                />
                <Route
                  path="service-categories"
                  element={<AdminServiceCategories />}
                />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </StyledApp>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: '8px' }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: '16px',
              maxWidth: '500px',
              padding: '12px 24px',
              backgroundColor: 'var(--color-grey-0)',
              color: 'var(--color-grey-700)',
            },
          }}
        />
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
