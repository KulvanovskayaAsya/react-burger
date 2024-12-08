import React, { useCallback } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styles from './profile-order-details.module.css'
import { useAuth } from '@/hooks/useAuth';

export const ProfileOrderDetails: React.FC = () => {
  const { logout } = useAuth();

  const handleLogout = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const refreshToken = localStorage.getItem('refreshToken');

    if(refreshToken) {
      logout();
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
