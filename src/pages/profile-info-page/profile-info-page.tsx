import React, { useCallback, useEffect } from 'react';

import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'

import commonStyles from '../../common.module.css'
import styles from './profile-info-page.module.css'
import { AppDispatch } from '../../services'
import { getUser, selectUser, updateUser } from '../../services/authSlice';

interface IProfileForm {
  name: string;
  username: string;
  password: string;
}

export const ProfileInfoPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  
  const { values, handleChange, resetForm } = useForm<IProfileForm>({
    name: user?.name || '',
    username: user?.email || '',
    password: ''
  });

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const handleProfileEditSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();

    dispatch(updateUser({ name: values.name, email: values.username }))
      .then((action) => {
        if (action.meta.requestStatus === 'fulfilled') {
          navigate('/profile');
        }
      });
  }, [dispatch, navigate, values]);
  
  const handleProfileEditCancel = useCallback(() => {
    if (user) {
      resetForm();
    }
  }, [user, resetForm]);

  return (
    <form className={commonStyles.form} onSubmit={handleProfileEditSubmit}>
      <EmailInput
        value={values.name}
        onChange={handleChange}
        name='name'
        placeholder='Имя'
        isIcon={true}
      />
      <EmailInput
        value={values.username}
        onChange={handleChange}
        name='username'
        placeholder='Логин'
        isIcon={true}
      />
      <PasswordInput
        value={values.password}
        onChange={handleChange}
        name='password'
        icon='EditIcon'
      />
      <div className={styles.formActions}>
        <Button 
          htmlType='button' 
          type='secondary' 
          size='medium'
          onClick={handleProfileEditCancel}
        >
          Отмена
        </Button>
        <Button 
          htmlType='submit' 
          type='primary' 
          size='medium'
        >
          Сохранить
        </Button>
      </div>
    </form>
  );
};
