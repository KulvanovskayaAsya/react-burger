import React, { useCallback } from 'react';

import commonStyles from '../../common.module.css';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useAuth } from '../../hooks/useAuth';

interface ILoginForm {
  email: string;
  password: string;
}

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const { values, handleChange } = useForm<ILoginForm>({
    email: '',
    password: ''
  });

  const handleLoginSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    login(values.email, values.password);
  }, [login, values]);

  return (
    <div className={commonStyles.formPageContainer}>
      <h1 className={commonStyles.pageTitle}>Вход</h1>
      <form className={commonStyles.form} onSubmit={handleLoginSubmit}>
        <EmailInput
          value={values.email}
          onChange={handleChange}
          name='email'
        />
        <PasswordInput
          value={values.password}
          onChange={handleChange}
          name='password'
        />
        <Button
          htmlType='submit'
          type='primary'
          size='medium'
        >
          Войти
        </Button>
      </form>
      <p className={commonStyles.formPageLinks}>Вы - новый пользователь? <Link to='/register'>Зарегистрироваться</Link></p>
      <p className={commonStyles.formPageLinks}>Забыли пароль? <Link to='/forgot-password'>Восстановить пароль</Link></p>
    </div>
  )
};
