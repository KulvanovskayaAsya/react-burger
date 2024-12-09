import React from 'react';

import loaderSVG from '@/assets/loader.svg';

import styles from './loader.module.css';

interface ILoaderProps {
  size?: number;
}

export const Loader: React.FC<ILoaderProps> = ({ size = 50 }) => {
  return (
    <div className={styles.loaderWrapper} style={{ width: size, height: size }}>
      <img src={loaderSVG} alt="Loading..." className={styles.loaderImage} />
    </div>
  );
};
