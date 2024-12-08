import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from '@/services';

import useScrollSpy from '@/hooks/useScrollSpy';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsTypeSection } from './ingredients-type-section';

import { RootState } from '@/services';

import { STATUS } from '@/types/slices';

import styles from './burger-ingredients.module.css';
import { selectIngredientsByType, selectIngredientsStatus } from '@/services/burger-ingredients-slice';

interface BurgerIngredientsProps {}

export const BurgerIngredients: React.FC<BurgerIngredientsProps> = () => {
  const status = useSelector(selectIngredientsStatus);

  const buns = useSelector((state: RootState) => selectIngredientsByType(state, 'bun'));
  const mains = useSelector((state: RootState) => selectIngredientsByType(state, 'main'));
  const sauces = useSelector((state: RootState) => selectIngredientsByType(state, 'sauce'));

  const sections = [
    { title: 'Булки', type: 'bun', ingredients: buns },
    { title: 'Начинки', type: 'main', ingredients: mains },
    { title: 'Соусы', type: 'sauce', ingredients: sauces },
  ];

  const [current, setCurrent] = useState('bun');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
          />
        ))}
      </div>
    </>
  );
};
