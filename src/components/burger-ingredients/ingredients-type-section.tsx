import { IngredientCard } from './ingredient-card';

import { Ingredient } from '../../types/burger';

import styles from './ingredients-type-section.module.css';

interface IngredientsTypeSectionProps {
  type: string;
  title: string;
  ingredients: Ingredient[];
  onIngredientClick: (ingredient: Ingredient) => void;
}

export const IngredientsTypeSection: React.FC<IngredientsTypeSectionProps> = ({
  type,
  title,
  ingredients,
  onIngredientClick
}) => {
  return (
    <section className={styles.section} id={type}>
      <h2 className={styles.sectionTitle}>{title}</h2>

      <div className={styles.sectionContent}>
        {ingredients.map(item => (
          <IngredientCard
            key={item._id}
            ingredient={item}
            onIngredientClick={onIngredientClick}
          />
        ))}
      </div>
    </section>
  )
}
