import React, { useCallback } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from './profile-page.module.css';
import { AppDispatch } from '../../services';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../services/authSlice';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  const handleLogout = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const refreshToken = localStorage.getItem('refreshToken');

    if(refreshToken) {
      dispatch(logoutUser(refreshToken))
        .then((action) => {
          if (action.meta.requestStatus === 'fulfilled') {
            navigate('/');
          }
        });
    }
  }, []);

  return (
    <>
      <aside className={styles.sidebar}>
        <NavLink 
          to='' 
          end
          className={({ isActive }) => 
            `${styles.link} ${isActive ? styles.activeLink : ''}`
          }
        >
          Профиль
        </NavLink>
        <NavLink 
          to='orders' 
          className={({ isActive }) => 
            `${styles.link} ${isActive ? styles.activeLink : ''}`
          }
        >
          История заказов
        </NavLink>
        <NavLink 
          to='/login'
          className={`${styles.link} ${styles.logoutLink}`}
          onClick={handleLogout}
        >
          Выход
        </NavLink>
        <p className={styles.caption}>
          В этом разделе вы можете <br/> изменить свои персональные данные
        </p>
      </aside>
      <section className={styles.content}>
        <Outlet />
      </section>
    </>
  );
};
