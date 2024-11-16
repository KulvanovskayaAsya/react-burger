import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './price.module.css';

interface IPriceProps {
  price: number;
}

export const Price: React.FC<IPriceProps> = ({ price }) => {
  return (
    <div className={styles.container}>
      <span className={styles.price}>{price}</span>
      <CurrencyIcon type='primary' />
    </div>
  )
}
