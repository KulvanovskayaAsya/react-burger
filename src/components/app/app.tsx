import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { 
  HomePage,
  LoginPage, 
  RegisterPage, 
  ForgotPasswordPage, 
  ResetPasswordPage,
  ProfilePage,
  ProfileInfoPage,
  OrdersHistoryPage
} from '../../pages';
import { MainLayout } from '../../layouts/main-layout/main-layout';

import { store } from '../../services';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path='/' element={<HomePage />} />

            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/forgot-password' element={<ForgotPasswordPage />} />
            <Route path='/reset-password' element={<ResetPasswordPage />} />

            <Route path='/profile' element={<ProfilePage />}>
              <Route index element={<ProfileInfoPage />}/>
              <Route path='orders' element={<OrdersHistoryPage />}>
                {/* <Route path=':id' element={<OrderPage />}/> */}
              </Route>
            </Route>
            {/* <Route path='/ingredients/:id' element={<IngredientPage />} />
            <Route path='*' element={<ErrorPage />} /> */}
          </Route>
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
