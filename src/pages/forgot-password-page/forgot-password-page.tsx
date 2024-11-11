import React, { useCallback } from 'react';

import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';

import commonStyles from '../../common.module.css';
import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../services';
import { forgotPassword } from '../../services/authSlice';

interface IForgotPasswordForm {
  email: string;
}

export const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  const { values, handleChange } = useForm<IForgotPasswordForm>({ email: '' });

  const handleForgotPasswordSubmit= useCallback((e: React.FormEvent) => {
    e.preventDefault();
    dispatch(forgotPassword(values.email)).then((action) => {
      if (action.meta.requestStatus === 'fulfilled') {
        navigate('/reset-password');
      }
    });
  }, [dispatch, navigate, values]);

  return (
    <div className={commonStyles.formPageContainer}>
      <h1 className={commonStyles.pageTitle}>Восстановление пароля</h1>
      <form className={commonStyles.form} onSubmit={handleForgotPasswordSubmit}>
        <EmailInput
          value={values.email}
          onChange={handleChange}
          name='email'
        />
        <Button 
          htmlType='submit' 
          type='primary' 
          size='medium'
        >
          Восстановить
        </Button>
      </form>
      <p className={commonStyles.formPageLinks}>Вспомнили пароль? <Link to='/login'>Войти</Link></p>
    </div>
  );
};
