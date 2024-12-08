import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './price.module.css';

interface IPriceProps {
  price: number | string;
  size?: 'small' | 'large';
}

export const Price: React.FC<IPriceProps> = ({ price, size = 'small' }) => {
  return (
    <div className={styles.container}>
      <span className={size === 'large' ? styles.priceLarge : styles.priceSmall}>
        {price}
      </span>
      <CurrencyIcon type='primary' />
    </div>
  )
}
