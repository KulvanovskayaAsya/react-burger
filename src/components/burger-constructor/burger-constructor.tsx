import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';

import { useModal } from '../../hooks/useModal';

import { Button, ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Price } from '../price/price';
import { Modal } from '../modal/modal';
import { OrderDetails } from './order-details';
import { DraggableIngredient } from './draggable-ingredient';

import {
  addIngredient,
  moveIngredient,
  removeIngredient,
  addBun,
  clearConstructorIngredients,
  selectBun,
  selectIngredients,
  selectTotalPrice
} from '../../services/burgerConstructorSlice';

import { clearOrder, submitOrder } from '../../services/orderSlice';
import { AppDispatch } from '../../services';

import { IIngredient } from '../../types/burger';

import styles from './burger-constructor.module.css';
import { useAuth } from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';

export const BurgerConstructor: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(ingredient: IIngredient) {
      if (ingredient.type === 'bun') {
        dispatch(addBun(ingredient));
      } else {
        dispatch(addIngredient(ingredient));
      }
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });

  const { isOpen, openModal, closeModal } = useModal();

  const totalPrice = useSelector(selectTotalPrice);
  const bun = useSelector(selectBun);
  const ingredients = useSelector(selectIngredients);

  const handleOrderSubmit = () => {
    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
    }

    if (bun && ingredients.length) {
      dispatch(submitOrder([bun, ...ingredients, bun]))
      openModal();
    }
  }

  const handleOrderClose = () => {
    dispatch(clearConstructorIngredients())
    dispatch(clearOrder());
    closeModal();
  }

  const moveCard = (fromIndex: number, toIndex: number) => {
    dispatch(moveIngredient({ fromIndex, toIndex }));
  };

  return (
    <div className={styles.container}>
      <div
        ref={dropTarget}
        className={`${styles.constructorWrapper} ${isHover ? styles.hovered : ''}`}
      >
        {!bun && ingredients.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Перетащите понравившиеся ингредиенты</p>
          </div>
        ) : (
          <>
            {bun && (
              <div className={`${styles.ingredient} ${styles.ingredientLocked}`}>
                <ConstructorElement
                  type='top'
                  isLocked={true}
                  text={`${bun.name} (верх)`}
                  price={bun.price}
                  thumbnail={bun.image}
                  extraClass='ml-8'
                />
              </div>
            )}
            {ingredients.length > 0 && (
              <div className={styles.scrollableContainer}>
                {ingredients.map((ingredient, index) => (
                  <DraggableIngredient
                    key={ingredient.key}
                    index={index}
                    onMove={moveCard}
                  >
                    <div className={styles.ingredient}>
                      <DragIcon type='primary' />
                      <ConstructorElement
                        text={ingredient.name}
                        price={ingredient.price}
                        thumbnail={ingredient.image}
                        handleClose={() => {
                          dispatch(removeIngredient(ingredient.key))
                        }}
                        extraClass='ml-8'
                      />
                    </div>
                  </DraggableIngredient>
                ))}
              </div>
            )}
            {bun && (
              <div className={`${styles.ingredient} ${styles.ingredientLocked}`}>
                <ConstructorElement
                  type='bottom'
                  isLocked={true}
                  text={`${bun.name} (низ)`}
                  price={bun.price}
                  thumbnail={bun.image}
                  extraClass='ml-8'
                />
              </div>
            )}
          </>
        )}
      </div>

      <div className={styles.submitOrderContainer}>
        <Price price={totalPrice} />
        <Button
          htmlType='button'
          type='primary'
          size='medium'
          onClick={handleOrderSubmit}
          disabled={!bun}
        >
          Оформить заказ
        </Button>
      </div>

      {isOpen && (
        <Modal onClose={handleOrderClose}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
}

