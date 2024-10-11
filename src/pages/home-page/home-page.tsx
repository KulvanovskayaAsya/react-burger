import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients';

import commonStyles from '../../common.module.css';
import styles from './home-page.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const HomePage = () => (
  <main className={commonStyles.mainContainer}>
    <h1 className={styles.pageTitle}>Соберите бургер</h1>
    <div className={commonStyles.flexContainer}>
      <DndProvider backend={HTML5Backend}>
        <div className={commonStyles.flexHalfChild}>
          <BurgerIngredients />
        </div>
        <div className={commonStyles.flexHalfChild}>
          <BurgerConstructor />
        </div>
      </DndProvider>
    </div>
  </main>
);
