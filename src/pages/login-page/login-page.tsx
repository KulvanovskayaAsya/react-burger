import React, { useCallback } from 'react';

import commonStyles from '../../common.module.css';
import { Button, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../services';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../services/authSlice';
import { useForm } from '../../hooks/useForm';

interface ILoginForm {
  email: string;
  password: string;
}

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  const { values, handleChange } = useForm<ILoginForm>({
    email: '',
    password: ''
  });
  
  const onIconClick = () => {}

  const handleLoginSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser(values))
      .then((action) => {
        if (action.meta.requestStatus === 'fulfilled') {
          navigate('/');
        }
      });
  },
  [dispatch, navigate, values]
  );

  return (
    <div className={commonStyles.formPageContainer}>
      <h1 className={commonStyles.pageTitle}>Вход</h1>
      <form className={commonStyles.form} onSubmit={handleLoginSubmit}>
        <EmailInput
          value={values.email}
          onChange={handleChange}
          name='email'
        />
        <Input
          value={values.password}
          onChange={handleChange}
          type='password'
          name='password'
          placeholder='Пароль'
          icon='ShowIcon'
          onIconClick={onIconClick}
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
