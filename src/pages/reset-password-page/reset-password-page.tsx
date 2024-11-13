import React, { useCallback, useEffect } from 'react';

import commonStyles from '../../common.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../services';
import { useForm } from '../../hooks/useForm';
import { resetPassword } from '../../services/authSlice';
import { useAuth } from '../../hooks/useAuth';

interface IResetPasswordForm {
  password: string;
  code: string;
}

export const ResetPasswordPage: React.FC = () => {
  const { resetPassword } = useAuth();
  const { values, handleChange } = useForm<IResetPasswordForm>({
    password: '',
    code: ''
  });

  const handleResetPasswordSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    resetPassword(values.password, values.code);
  }, [resetPassword, values]);

  return (
    <div className={commonStyles.formPageContainer}>
      <h1 className={commonStyles.pageTitle}>Восстановление пароля</h1>
      <form className={commonStyles.form} onSubmit={handleResetPasswordSubmit}>
        <PasswordInput
          value={values.password}
          onChange={handleChange}
          name='password'
        />
        <Input
          value={values.code}
          onChange={handleChange}
          type='text'
          name='code'
          placeholder='Введите код из письма'
        />
        <Button
          htmlType='submit'
          type='primary'
          size='medium'
        >
          Сохранить
        </Button>
      </form>
      <p className={commonStyles.formPageLinks}>Вспомнили пароль? <Link to='/login'>Войти</Link></p>
    </div>
  );
};
