import React, { useCallback } from 'react';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useAuth } from '../../hooks/useAuth';
import commonStyles from '../../common.module.css';

interface IRegisterForm {
  name: string;
  email: string;
  password: string;
}

export const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const { values, handleChange } = useForm<IRegisterForm>({
    name: '',
    email: '',
    password: ''
  });

  const handleRegisterSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    register(values.email, values.password, values.name);
  }, [register, values]);

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
