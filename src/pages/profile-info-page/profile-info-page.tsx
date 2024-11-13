import React, { useCallback, useMemo, useState } from 'react';

import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useForm } from '../../hooks/useForm'

import commonStyles from '../../common.module.css'
import styles from './profile-info-page.module.css'
import { useAuth } from '../../hooks/useAuth';

interface IProfileForm {
  name: string;
  username: string;
  password: string;
}

export const ProfileInfoPage: React.FC = () => {
  const [isNameEditing, setIsNameEditing] = useState<boolean>(false);
  const { user, updateUserProfile } = useAuth();

  const { values, handleChange, resetForm } = useForm<IProfileForm>({
    name: user?.name || '',
    username: user?.email || '',
    password: ''
  });

  const isProfileEditing = useMemo(() => {
    return values.name !== user?.name || values.username !== user?.email || values.password !== '';
  }, [values, user]);

  const handleProfileEditSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile(values.name, values.username, values.password);
  }, [updateUserProfile, values]);

  const handleProfileEditCancel = useCallback(() => {
    if (user) {
      resetForm();
      setIsNameEditing(false);
    }
  }, [user, resetForm]);

  return (
    <form className={commonStyles.form} onSubmit={handleProfileEditSubmit}>
      <Input
        value={values.name}
        onChange={handleChange}
        name='name'
        placeholder='Имя'
        icon='EditIcon'
        onIconClick={() => setIsNameEditing(true)}
        onBlur={() => setIsNameEditing(false)}
        disabled={!isNameEditing}
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
      {isProfileEditing && (
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
      )} 
    </form>
  );
};
