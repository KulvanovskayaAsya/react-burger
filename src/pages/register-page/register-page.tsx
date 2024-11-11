import React, { useCallback } from 'react';
import commonStyles from '../../common.module.css';
import { Button, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/authSlice';
import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../services';

interface IRegisterForm {
  name: string;
  email: string;
  password: string;
}

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  const { values, handleChange } = useForm<IRegisterForm>({
    name: '',
    email: '',
    password: ''
  });

  const onIconClick = () => {};

  const handleRegisterSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUser(values))
      .then((action) => {
        if (action.meta.requestStatus === 'fulfilled') {
          navigate('/');
        }
      });
  }, [dispatch, navigate, values]);

  return (
    <div className={commonStyles.formPageContainer}>
      <h1 className={commonStyles.pageTitle}>Регистрация</h1>
      <form className={commonStyles.form} onSubmit={handleRegisterSubmit}>
        <Input
          value={values.name}
          onChange={handleChange}
          type='text'
          name='name'
          placeholder='Имя'
        />
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
          disabled={status === 'loading'}
        >
          Зарегистрироваться
        </Button>
      </form>
      <p className={commonStyles.formPageLinks}>Уже зарегистрированы? <Link to='/login'>Войти</Link></p>
    </div>
  );
};
