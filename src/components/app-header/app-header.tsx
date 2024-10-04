import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

export const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav className='main-container'>
        <ul className={styles.navList}>
          <li>
            <a href='/' className={`${styles.navLink} ${styles.active}`}>
              <BurgerIcon type='primary' />
              <p className={styles.text}>Конструктор</p>
            </a>
          </li>

          <li className={styles.navItem}>
            <a href='/orders' className={styles.navLink}>
              <ListIcon type='secondary' />
              <p className={styles.text}>Лента заказов</p>
            </a>
          </li>

          <li className={`${styles.navItem} ${styles.logo}`}>
            <a href='/' className={styles.logoLink}>
              <Logo />
            </a>
          </li>

          <li className={styles.navItem}>
            <a href='/profile' className={styles.navLink}>
              <ProfileIcon type='secondary' />
              <p className={styles.text}>Личный кабинет</p>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
