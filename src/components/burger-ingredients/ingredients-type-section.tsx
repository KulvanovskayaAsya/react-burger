import { Ingredient } from '../../types/burger';
import { IngridientCard } from './ingredient-card';
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
  onAddIngredient,
  onIngredientClick
}) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>

      <div className={styles.sectionContent}>
        {ingredients.map(item => (
          <IngridientCard
            key={item._id}
            ingredient={item}
            count={ingredientCounts[item._id] || 0}
            onAddIngredient={onAddIngredient}
            onIngredientClick={onIngredientClick}
          />
        ))}
      </div>
    </section>
  )
}
