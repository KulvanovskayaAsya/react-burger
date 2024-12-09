import { useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'

import { MainLayout } from '@/layouts/main-layout/main-layout'
import {
  HomePage,
  FeedPage,
  FeedDetails,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  ProfileInfoPage,
  ProfileOrdersPage,
  ErrorPage
} from '@/pages'


import { AuthGuard, GuestGuard } from '@/utils/protected-route';

import { Modal } from '@/components/modal/modal'
import { IngredientDetails } from '@/components/burger-ingredients/ingredient-details';

import { useDispatch, useSelector } from '@/services';
import { fetchIngredients, selectIngredientsStatus } from '@/services/burger-ingredients-slice';
import { useAuth } from '@/hooks/useAuth';

import { STATUS } from '@/types/slices';

function App() {
  const dispatch = useDispatch();
  const status = useSelector(selectIngredientsStatus);
  const { isAuthChecked, fetchUser } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  useEffect(() => {
    if (!isAuthChecked) {
      fetchUser();
    }
  }, [isAuthChecked, fetchUser]);

  useEffect(() => {
    if (status === STATUS.IDLE) {
      dispatch(fetchIngredients());
    }
  }, [status]);

  const handleModalClose = () => {
    navigate(-1);
  };

  return (
    <>
      <Routes location={background || location}>
        <Route element={<MainLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/ingredients/:ingredientId' element={<IngredientDetails />} />
          <Route path='/feed' element={<FeedPage />}/>
          <Route path='/feed/:id' element={<FeedDetails />} />

          <Route
            path='/login'
            element={
              <GuestGuard>
                <LoginPage />
              </GuestGuard>
            }
          />
          <Route
            path='/register'
            element={
              <GuestGuard>
                <RegisterPage />
              </GuestGuard>
            }
          />
          <Route
            path='/forgot-password'
            element={
              <GuestGuard>
                <ForgotPasswordPage />
              </GuestGuard>
            }
          />
          <Route
            path='/reset-password'
            element={
              <GuestGuard>
                <ResetPasswordPage />
              </GuestGuard>
            }
          />

          <Route
            path='/profile'
            element={
              <AuthGuard>
                <ProfilePage />
              </AuthGuard>
            }
          >
            <Route index element={<ProfileInfoPage />} />
            <Route path='orders' element={<ProfileOrdersPage />} />
            <Route path='orders/:id' element={<FeedDetails />} />
          </Route>
          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>

      {background && (
        <Routes>
	        <Route
	          path='/ingredients/:ingredientId'
	          element={
	            <Modal onClose={handleModalClose}>
	              <IngredientDetails />
	            </Modal>
	          }
	        />
          <Route
            path="/feed/:id"
            element={
              <Modal onClose={handleModalClose}>
                <FeedDetails />
              </Modal>
            }
          />
          <Route
            path="/profile/orders/:id"
            element={
              <Modal onClose={handleModalClose}>
                <FeedDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
