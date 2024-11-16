import React from 'react';
import styles from './error-page.module.css'

export const ErrorPage: React.FC = () => {
  return (
    <h1 className={styles.text}>Упс! Похоже такой страницы не существует</h1>
  );
};
