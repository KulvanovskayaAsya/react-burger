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

import { OnlyAuth, OnlyUnAuth } from '../../utils/protected-route';

import { Modal } from '../modal/modal';
import { IngredientDetails } from '../burger-ingredients/ingredient-details';
import { AppDispatch } from '../../services';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients, selectIngredientsStatus } from '../../services/burgerIngredientsSlice';
import { useEffect } from 'react';
import { STATUS } from '../../types/slices';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector(selectIngredientsStatus);
  
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;
  
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
          <Route path='/orders' element={<OrdersPage />} />

          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/forgot-password' element={<ForgotPasswordPage />} />
          <Route path='/reset-password' element={<ResetPasswordPage />} />

          <Route path='/profile' element={<ProfilePage />}>
            <Route index element={<ProfileInfoPage />}/>
            <Route path='orders' element={<ProfileOrdersPage />}>
              {/* <Route path=':id' element={<OrderPage />}/> */}
            </Route>
          </Route>
          <Route path='/ingredients/:ingredientId' element={<IngredientDetails />} />
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
