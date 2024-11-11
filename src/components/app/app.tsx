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
  OrdersHistoryPage,
} from '../../pages';
import { MainLayout } from '../../layouts/main-layout/main-layout';

import { OnlyAuth, OnlyUnAuth } from '../../utils/protected-route';

import { store } from '../../services';

function App() {
  return (
    // <Provider store={store}>
    //   <Router>
    //     <Routes>
    //       <Route element={<MainLayout />}>
    //         <Route path='/' element={<HomePage />} />

    //         <Route
    //           path='/login'
    //           element={
    //             <OnlyUnAuth>
    //               <LoginPage />
    //             </OnlyUnAuth>
    //           }
    //         />
    //         <Route
    //           path='/register'
    //           element={
    //             <OnlyUnAuth>
    //               <RegisterPage />
    //             </OnlyUnAuth>
    //           }
    //         />
    //         <Route
    //           path='/forgot-password'
    //           element={
    //             <OnlyUnAuth>
    //               <ForgotPasswordPage />
    //             </OnlyUnAuth>
    //           }
    //         />
    //         <Route
    //           path='/reset-password'
    //           element={
    //             <OnlyUnAuth>
    //               <ResetPasswordPage />
    //             </OnlyUnAuth>
    //           }
    //         />

    //         <Route
    //           path='/profile'
    //           element={
    //             <OnlyAuth>
    //               <ProfilePage />
    //             </OnlyAuth>
    //           }
    //         >
    //           <Route index element={<ProfileInfoPage />} />
    //           <Route path='orders' element={<OrdersHistoryPage />} />
    //         </Route>

    //         {/* Дополнительные маршруты */}
    //         {/* <Route path='/ingredients/:id' element={<IngredientPage />} />
    //       <Route path='*' element={<ErrorPage />} /> */}
    //       </Route>
    //     </Routes>
    //   </Router>
    // </Provider>
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
  );
}

export default App;
