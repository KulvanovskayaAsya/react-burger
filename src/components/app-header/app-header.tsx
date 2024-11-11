import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import commonStyles from '../../common.module.css';
import styles from './app-header.module.css';
import { NavLink } from 'react-router-dom';

export const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav className={commonStyles.mainContainer}>
        <ul className={styles.navList}>
          <li>
            <NavLink to='/' className={`${styles.navLink} ${styles.active}`}>
              <BurgerIcon type='primary' />
              <p className={styles.text}>Конструктор</p>
            </NavLink>
          </li>

          <li className={styles.navItem}>
            <NavLink to='/orders' className={styles.navLink}>
              <ListIcon type='secondary' />
              <p className={styles.text}>Лента заказов</p>
            </NavLink>
          </li>

          <li className={`${styles.navItem} ${styles.logo}`}>
            <NavLink to='/' className={styles.logoLink}>
              <Logo />
            </NavLink>
          </li>

          <li className={styles.navItem}>
            <NavLink to='/profile' className={styles.navLink}>
              <ProfileIcon type='secondary' />
              <p className={styles.text}>Личный кабинет</p>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
