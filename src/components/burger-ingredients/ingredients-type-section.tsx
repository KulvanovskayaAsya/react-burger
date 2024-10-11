import { Ingredient } from '../../types/burger';
import { IngredientCard } from './ingredient-card';
import styles from './ingredients-type-section.module.css';

interface IngredientsTypeSectionProps {
  title: string;
  ingredients: Ingredient[];
  ingredientCounts: { [key: string]: number };
  onAddIngredient: (ingredient: Ingredient) => void;
  onIngredientClick: (ingredient: Ingredient) => void;
}

export const IngredientsTypeSection: React.FC<IngredientsTypeSectionProps> = ({
  title,
  ingredients,
  ingredientCounts,
  onIngredientClick
}) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>

      <div className={styles.sectionContent}>
        {ingredients.map(item => (
          <IngredientCard
            key={item._id}
            ingredient={item}
            count={0}
            onIngredientClick={onIngredientClick}
          />
        ))}
      </div>
    </section>
  )
}
