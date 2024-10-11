import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useModal } from '../../hooks/useModal';
import useScrollSpy from '../../hooks/useScrollSpy';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsTypeSection } from './ingredients-type-section';
import { IngredientDetails } from './ingredient-details';
import { Modal } from '../modal/modal';

import { AppDispatch, RootState } from '../../services';
import { fetchIngredients, selectIngredientsByType, selectIngredientsStatus } from '../../services/burgerIngredientsSlice';
import { setSelectedIngredient, clearSelectedIngredient, selectSelectedIngredient } from '../../services/ingredientDetailsSlice';

import { STATUS } from '../../types/slices';
import { Ingredient } from '../../types/burger';

import styles from './burger-ingredients.module.css';

interface BurgerIngredientsProps {}

export const BurgerIngredients: React.FC<BurgerIngredientsProps> = () => {
  const dispatch = useDispatch<AppDispatch>();

  const status = useSelector(selectIngredientsStatus);
  const selectedIngredient = useSelector(selectSelectedIngredient);

  const buns = useSelector((state: RootState) => selectIngredientsByType(state, 'bun'));
  const mains = useSelector((state: RootState) => selectIngredientsByType(state, 'main'));
  const sauces = useSelector((state: RootState) => selectIngredientsByType(state, 'sauce'));

  const sections = [
    { title: 'Булки', type: 'bun', ingredients: buns },
    { title: 'Начинки', type: 'main', ingredients: mains },
    { title: 'Соусы', type: 'sauce', ingredients: sauces },
  ];

  useEffect(() => {
    if (status === STATUS.IDLE) {
      dispatch(fetchIngredients());
    }
  }, [status]);

  const [current, setCurrent] = useState('bun');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { isOpen, openModal, closeModal } = useModal();
  const activeTab = useScrollSpy(sections.map(({ type }) => type), { root: scrollContainerRef.current, rootMargin: '0px 0px -90% 0px' });

  useEffect(() => {
    if (activeTab) {
      setCurrent(activeTab);
    }
  }, [activeTab]);

  const handleScrollEnd = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const isAtBottom = container.scrollHeight - container.scrollTop === container.clientHeight;
      if (isAtBottom) {
        setCurrent('sauce');
      }
    }
  };

  const handleTabClick = useCallback((value: string) => {
    setCurrent(value);

    const section = document.getElementById(value);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleIngredientClick = useCallback((ingredient: Ingredient) => {
    dispatch(setSelectedIngredient(ingredient));
    openModal();
  }, [openModal]);

  const closeModalHandler = () => {
    dispatch(clearSelectedIngredient());
    closeModal();
  };

  if (status === STATUS.LOADING) {
    return <p>Да, вы голодны, ингредиенты уже летят к вам...</p>;
  }

  if (status === STATUS.FAILED) {
    return <p>Ой, похоже кто-то украл все ингредиенты, уже разбираемся</p>;
  }

  return (
    <>
      <div className={styles.tabs}>
        {sections.map(({ type, title }) => (
          <Tab key={type} value={type} active={current === type} onClick={() => handleTabClick(type)}>
            {title}
          </Tab>
        ))}
      </div>

      <div className={styles.burgerIngredients} ref={scrollContainerRef} onScroll={handleScrollEnd}>
        {sections.map(({ title, type, ingredients }) => (
          <IngredientsTypeSection
            key={type}
            title={title}
            type={type}
            ingredients={ingredients}
            onIngredientClick={handleIngredientClick}
          />
        ))}
      </div>

      {isOpen && selectedIngredient && (
        <Modal title="Детали ингредиента" onClose={closeModalHandler}>
          <IngredientDetails ingredient={selectedIngredient} />
        </Modal>
      )}
    </>
  );
};
