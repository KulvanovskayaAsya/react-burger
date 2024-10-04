import React from 'react';
import { Button, ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css';
import { Ingredient } from '../../types/burger';
import { Price } from '../price/price';
import { useModal } from '../../hooks/useModal';
import { Modal } from '../modal/modal';
import { OrderDetails } from './order-details';

interface BurgerConstructorProps {
  ingredients: Ingredient[];
}
export const BurgerConstructor: React.FC<BurgerConstructorProps> = ({ ingredients }) => {
  const { isOpen, openModal, closeModal } = useModal();
  
  const topBun = ingredients.find(item => item.type === 'bun');
  const bottomBun = ingredients.find(item => item.type === 'bun');
  const mainIngredients = ingredients.filter(item => item.type !== 'bun');

  if (!ingredients || ingredients.length === 0) {
    return;
  }
  
  return (
    <div className={styles.container}>
      {topBun && (
        <div className={`${styles.ingredient} ${styles.ingredientLocked}`}>
          <ConstructorElement
            type='top'
            isLocked={true}
            text={`${topBun.name} (верх)`}
            price={topBun.price}
            thumbnail={topBun.image}
            extraClass='ml-8'
          />
        </div>
      )}

      <div className={styles.scrollableContainer}>
        {mainIngredients.map(ingredient => (
          <div key={ingredient._id} className={styles.ingredient}>
            <DragIcon type='primary' />
            <ConstructorElement
              text={ingredient.name}
              price={ingredient.price}
              thumbnail={ingredient.image}
              handleClose={() => {}}
              extraClass='ml-8'
            />
          </div>
        ))}
      </div>

      {bottomBun && (
        <div className={`${styles.ingredient} ${styles.ingredientLocked}`}>
          <ConstructorElement
            type='bottom'
            isLocked={true}
            text={`${bottomBun.name} (низ)`}
            price={bottomBun.price}
            thumbnail={bottomBun.image}
            extraClass='ml-8'
          />
        </div>
      )}
      <div className={styles.submitOrderContainer}>
        <Price price={1200} />
        <Button htmlType='button' type='primary' size='medium' onClick={openModal}>
          Оформить заказ
        </Button>
      </div>
      {isOpen && (
        <Modal onClose={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  )
}
