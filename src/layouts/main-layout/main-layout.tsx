import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppHeader } from '../../components/app-header/app-header';
import styles from './main-layout.module.css';

export const MainLayout: React.FC = () => {
  return (
    <>
      <AppHeader />
      <main className={styles.mainContainer}>
        <Outlet />
      </main>
    </>
  );
};
