import React, { useCallback } from 'react';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/authSlice';
import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import commonStyles from '../../common.module.css';
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
          Зарегистрироваться
        </Button>
      </form>
      <p className={commonStyles.formPageLinks}>Уже зарегистрированы? <Link to='/login'>Войти</Link></p>
    </div>
  );
};
