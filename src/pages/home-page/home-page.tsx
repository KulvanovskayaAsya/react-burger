import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients';

import commonStyles from '../../common.module.css';
import styles from './home-page.module.css';

export const HomePage: React.FC = () => (
  <main className={commonStyles.mainContainer}>
    <h1 className={styles.pageTitle}>Соберите бургер</h1>
    <DndProvider backend={HTML5Backend}>
      <div className={commonStyles.flexContainer}>
        <div className={commonStyles.flexHalfChild}>
          <BurgerIngredients />
        </div>
        <div className={commonStyles.flexHalfChild}>
          <BurgerConstructor />
        </div>
      </div>
    </DndProvider>
  </main>
);
