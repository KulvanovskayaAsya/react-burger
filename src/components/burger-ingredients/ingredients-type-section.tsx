import { IngredientCard } from './ingredient-card';

import { IIngredient } from '../../types/burger';

import styles from './ingredients-type-section.module.css';

interface IIngredientsTypeSectionProps {
  type: string;
  title: string;
  ingredients: IIngredient[];
}

export const IngredientsTypeSection: React.FC<IIngredientsTypeSectionProps> = ({
  type,
  title,
  ingredients
}) => {
  return (
    <section className={styles.section} id={type}>
      <h2 className={styles.sectionTitle}>{title}</h2>

      <div className={styles.sectionContent}>
        {ingredients.map(item => (
          <IngredientCard
            key={item._id}
            ingredient={item}
          />
        ))}
      </div>
    </section>
  )
}
