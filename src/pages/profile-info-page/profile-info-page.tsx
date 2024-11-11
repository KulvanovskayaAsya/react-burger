import React, { useCallback } from 'react';

import commonStyles from '../../common.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';

export const ProfileInfoPage: React.FC = () => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState('value')
  const inputRef = React.useRef(null)
  const onIconClick = () => {
    setTimeout(() => inputRef?.current?.focus(), 0)
    alert('Icon Click Callback')
  }
  
  const handleCancelForm = useCallback(() => {
    console.log('cancel');
  }, []);

  const handleSubmitForm = useCallback(() => {
    navigate('/')
  }, [navigate]);

  return (
    <form className={commonStyles.mainContainer}>
      <h2>Профиль</h2>
      <Input
        type='text'
        placeholder='Имя'
        onChange={(e) => setValue(e.target.value)}
        icon='EditIcon'
        value={value}
        name={'name'}
        error={false}
        ref={inputRef}
        onIconClick={onIconClick}
        errorText={'Проверьте введенный пароль'}
      />
      <Input
        type='text'
        placeholder='Логин'
        onChange={(e) => setValue(e.target.value)}
        icon='EditIcon'
        value={value}
        name={'name'}
        error={false}
        ref={inputRef}
        onIconClick={onIconClick}
        errorText={'Проверьте введенный пароль'}
      />
      <Input
        type='password'
        placeholder='Пароль'
        onChange={(e) => setValue(e.target.value)}
        icon='EditIcon'
        value={value}
        name={'name'}
        error={false}
        ref={inputRef}
        onIconClick={onIconClick}
        errorText={'Проверьте введенный пароль'}
      />
      <Button 
        htmlType='button' 
        type='secondary' 
        size='medium'
        onClick={handleCancelForm}
      >
        Отмена
      </Button>
      <Button 
        htmlType='button' 
        type='primary' 
        size='medium'
        onClick={handleSubmitForm}
      >
        Сохранить
      </Button>
    </form>
  );
};
