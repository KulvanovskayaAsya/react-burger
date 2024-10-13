import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './price.module.css';

interface PriceProps {
  price: number;
}

export const Price: React.FC<PriceProps> = ({ price }) => {
  return (
    <div className={styles.container}>
      <span className={styles.price}>{price}</span>
      <CurrencyIcon type='primary' />
    </div>
  )
}
