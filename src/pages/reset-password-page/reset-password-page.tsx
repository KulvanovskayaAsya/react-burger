import React, { useCallback } from 'react';

import commonStyles from '../../common.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../services';
import { useForm } from '../../hooks/useForm';
import { resetPassword } from '../../services/authSlice';

interface IResetPasswordForm {
  password: string;
  code: string;
}

export const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  const { values, handleChange } = useForm<IResetPasswordForm>({
    password: '',
    code: ''
  });
  
  const onIconClick = () => {}

  const handleResetPasswordSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    dispatch(resetPassword(values)).then((action) => {
      if (action.meta.requestStatus === 'fulfilled') {
        navigate('/');
      }
    });
  }, [dispatch, navigate, values]);

  return (
    <div className={commonStyles.formPageContainer}>
      <h1 className={commonStyles.pageTitle}>Восстановление пароля</h1>
      <form className={commonStyles.form} onSubmit={handleResetPasswordSubmit}>
        <Input
          value={values.password}
          onChange={handleChange}
          type='password'
          name='password'
          placeholder='Введите новый пароль'
          icon='ShowIcon'
          onIconClick={onIconClick}
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
