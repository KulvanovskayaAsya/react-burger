import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './price.module.css';

interface IPriceProps {
  price: number | string;
  size?: 'small' | 'large';
  className?: string;
}

export const Price: React.FC<IPriceProps> = ({ price, size = 'small', className }) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <span className={size === 'large' ? styles.priceLarge : styles.priceSmall}>
        {price}
      </span>
      <CurrencyIcon type='primary' />
    </div>
  )
}
