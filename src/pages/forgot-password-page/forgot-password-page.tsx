import React, { useCallback } from 'react';

import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

import { useForm } from '../../hooks/useForm';
import { useAuth } from '../../hooks/useAuth';

import commonStyles from '../../common.module.css';
interface IForgotPasswordForm {
  email: string;
}

export const ForgotPasswordPage: React.FC = () => {
  const { forgotPassword } = useAuth();
  const { values, handleChange } = useForm<IForgotPasswordForm>({ email: '' });

  const handleForgotPasswordSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    forgotPassword(values.email);
  }, [forgotPassword, values]);

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
