import React from 'react';
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from 'react-redux';

import { Button, ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css';

import { Price } from '../price/price';
import { useModal } from '../../hooks/useModal';
import { Modal } from '../modal/modal';
import { OrderDetails } from './order-details';
import { addIngredient, selectBun, selectIngredients } from '../../services/burgerConstructorSlice';
import { AppDispatch } from '../../services';
import { Ingredient } from '../../types/burger';

interface BurgerConstructorProps {}

export const BurgerConstructor: React.FC<BurgerConstructorProps> = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [{ isHover }, dropTarget] = useDrop({
    accept: "animal",
    drop(ingredient: Ingredient) {
      dispatch(addIngredient(ingredient))
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
  })
});

  const { isOpen, openModal, closeModal } = useModal();

  const topBun = useSelector(selectBun);
  const bottomBun = topBun;
  const ingredients = useSelector(selectIngredients);

  return (
    <div
      className={`${styles.container} ${styles.burgerConstructor} ${styles.burgerConstructor} ${isHover && styles.hovered}`}
      ref={dropTarget}
    >
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
        {ingredients.map(ingredient => (
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
