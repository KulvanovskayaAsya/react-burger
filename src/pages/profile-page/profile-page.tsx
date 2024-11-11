import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styles from './profile-page.module.css';

export const ProfilePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <NavLink to="" end className={({ isActive }) => isActive ? styles.activeLink : ''}>
          Профиль
        </NavLink>
        <NavLink to="order-history" className={({ isActive }) => isActive ? styles.activeLink : ''}>
          История заказов
        </NavLink>
        <button className={styles.logoutButton}>Выход</button>
      </aside>
      <section className={styles.content}>
        <Outlet />
      </section>
    </div>
  );
};
