import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
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
import TermsAndConditions from './pages/TermsAndConditions';
import Orders from './pages/Orders';
import Order from './pages/Order';
import styled from 'styled-components';
import { DarkModeProvider } from './context/DarkModeContext';
import ProtectedRoute from './ui/ProtectedRoute';
import VerifyAccount from './pages/VerifyAccount';
import AccountLayout from './ui/AccountLayout';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Chat from './pages/Chat';
import Blog from './pages/Blog';
import Article from './pages/Article';
import AdminLayout from './ui/AdminLayout';
import Admin from './ui/Admin';
import AdminComments from './ui/AdminComments';
import AdminManagePosts from './ui/AdminManagePosts';
import AdminNewPost from './ui/AdminNewPost';
import AdminOrders from './ui/AdminOrders';
import AdminUsers from './ui/AdminUsers';
import AdminAddUser from './ui/AdminAddUser';
import AdminUserProfile from './ui/AdminUserProfile';
import AdminNewPostCategory from './ui/AdminNewPostCategory';
import AdminManagePostCategories from './ui/AdminManagePostCategories';
import AdminNewService from './ui/AdminNewService';
import AdminManageServices from './ui/AdminManageServices';
import AdminEditPost from './ui/AdminEditPost';

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

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <StyledApp>
          <GlobalStyles />
          <BrowserRouter>
            <Routes>
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
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
                <Route
                  path="terms-and-conditions"
                  element={<TermsAndConditions />}
                />
                <Route path="privacy-policy" element={<PrivacyPolicy />} />
                <Route element={<AccountLayout />}>
                  <Route path="my-account" element={<Account />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="orders/:orderId" element={<Order />} />
                </Route>
              </Route>
              <Route path="auth/signup" element={<Signup />} />
              <Route path="auth/login" element={<Login />} />
              <Route
                path="/verify-account/:token"
                element={<VerifyAccount />}
              />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route
                path="reset-password/:resetToken"
                element={<ResetPassword />}
              />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Admin />} />
                <Route path="comments" element={<AdminComments />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="users/new" element={<AdminAddUser />} />
                <Route path="users/profile" element={<AdminUserProfile />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="posts/new" element={<AdminNewPost />} />
                <Route path="posts" element={<AdminManagePosts />} />
                <Route path="posts/edit/:slug" element={<AdminEditPost />} />
                <Route path="services/new" element={<AdminNewService />} />
                <Route path="services" element={<AdminManageServices />} />
                <Route
                  path="categories/new"
                  element={<AdminNewPostCategory />}
                />
                <Route
                  path="categories/manage"
                  element={<AdminManagePostCategories />}
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
