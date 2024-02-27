// import { styled } from 'styled-components';
// import Spinner from './Spinner';
// import { useUser } from '../features/authentication/useUser';
// import { useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';

// const FullPage = styled.div`
//   height: 100%;
//   background-color: var(--color-grey-50);
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

function ProtectedRoute({ children }) {
  //   const navigate = useNavigate();

  //   // 1. Load the authenticated user
  //   const { user, isLoading } = useUser();

  //   // 2. If there is no user, redirect to /login
  //   useEffect(
  //     function () {
  //       if (!user && !isLoading) navigate('/auth/login');
  //     },
  //     [user, isLoading, navigate],
  //   );

  //   // 3. While loading, show a spinner
  //   if (isLoading)
  //     return (
  //       <FullPage>
  //         <Spinner />
  //       </FullPage>
  //     );
  //   console.log(user);
  //   // 4. If there is a user, render the app
  return children;
}

export default ProtectedRoute;
