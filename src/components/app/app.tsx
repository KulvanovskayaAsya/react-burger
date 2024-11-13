import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import {
  HomePage,
  OrdersPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  ProfileInfoPage,
  ProfileOrdersPage,
} from '../../pages';
import { MainLayout } from '../../layouts/main-layout/main-layout';

import { AuthGuard, GuestGuard } from '../../utils/protected-route';

import { Modal } from '../modal/modal';
import { IngredientDetails } from '../burger-ingredients/ingredient-details';
import { AppDispatch } from '../../services';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients, selectIngredientsStatus } from '../../services/burgerIngredientsSlice';
import { useEffect } from 'react';
import { STATUS } from '../../types/slices';
import { useAuth } from '../../hooks/useAuth';

function App() {
  const dispatch = useDispatch<AppDispatch>();
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
          <Route path='/orders' element={<OrdersPage />} />

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
            <Route index element={<ProfileInfoPage />}/>
            <Route path='orders' element={<ProfileOrdersPage />}/>
          </Route>

          {/* <Route path='*' element={<ErrorPage />} /> */}
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
        </Routes>
      )}
    </>
  );
}

export default App;
