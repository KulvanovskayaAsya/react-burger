import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Ingredient } from '../../types/burger';
import { IngredientsTypeSection } from './ingredients-type-section';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import useScrollSpy from '../../hooks/useScrollSpy';

import styles from './burger-ingredients.module.css';
import { useModal } from '../../hooks/useModal';
import { IngredientDetails } from './ingredient-details';
import { Modal } from '../modal/modal';
import { AppDispatch } from '../../services';
import { fetchIngredients, selectIngredients, selectIngredientsStatus } from '../../services/ingredientsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { STATUS } from '../../types/slices';

interface BurgerIngredientsProps {
  // ingredientCounts: { [key: string]: number };
  // onAddIngredient: (ingredient: Ingredient) => void;
}

const ingredientTypes = [
  { type: 'bun', title: 'Булки', id: 'bun' },
  { type: 'main', title: 'Начинки', id: 'main' },
  { type: 'sauce', title: 'Соусы', id: 'sauce' },
];

export const BurgerIngredients: React.FC<BurgerIngredientsProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const ingredients = useSelector(selectIngredients);
  const status = useSelector(selectIngredientsStatus);

  useEffect(() => {
    if (status === STATUS.IDLE) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, status]);

  const [current, setCurrent] = useState('bun');
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { isOpen, openModal, closeModal } = useModal();
  const activeTab = useScrollSpy(ingredientTypes.map(({ id }) => id), { root: scrollContainerRef.current, rootMargin: '0px 0px -90% 0px' });
  
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
        setCurrent('sauce'); // Активируем последнюю секцию, если скролл дошел до конца
      }
    }
  };

  const handleTabClick = (value: string) => {
    setCurrent(value);
    const section = document.getElementById(value);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleIngredientClick = useCallback((ingredient: Ingredient) => {
    setSelectedIngredient(ingredient);
    openModal();
  }, []);

  return (
    <>
      <div className={styles.tabs}>
        {ingredientTypes.map(({ id, title }) => (
          <Tab key={id} value={id} active={current === id} onClick={() => handleTabClick(id)}>
            {title}
          </Tab>
        ))}
      </div>

      <div className={styles.burgerIngredients} ref={scrollContainerRef} onScroll={handleScrollEnd}>
        {ingredientTypes.map(({ type, title, id }) => {
          const filteredIngredients = useMemo(() => ingredients?.filter(ingredient => ingredient.type === type), [ingredients]);

          return (
            <div id={id} key={id}>
              <IngredientsTypeSection 
                title={title}
                ingredients={filteredIngredients}
                ingredientCounts={ingredientCounts}
                onAddIngredient={onAddIngredient}
                onIngredientClick={handleIngredientClick}
              />
            </div>
          );
        })}
      </div>

      {isOpen && selectedIngredient && (
        <Modal title='Детали ингредиента' onClose={closeModal}>
          <IngredientDetails ingredient={selectedIngredient}/>
        </Modal>
      )}
    </>
  );
};
