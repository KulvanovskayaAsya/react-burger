import { useSelector } from '@/services';
import { IOrder } from '@/types/feed';
import { FeedCard } from '@/components/feed-card/feed-card';
import { selectIngredientsMap } from '@/services/burger-ingredients-slice';
import { IIngredient } from '@/types/burger';
import styles from './feed-list.module.css'

interface IFeedListProps {
  orders: IOrder[];
  showStatus?: boolean;
  baseLinkPath: string;
}

export const FeedList: React.FC<IFeedListProps> = ({ orders, showStatus = false, baseLinkPath }) => {
  const ingredientsMap = useSelector(selectIngredientsMap);

  const getIngredientsImages = (ids: string[]): Array<IIngredient & { quantity: number }> => {
    const ingredientsCount: Record<string, number> = {};
  
    ids.forEach((id) => {
      ingredientsCount[id] = (ingredientsCount[id] || 0) + 1;
    });
  
    return Object.entries(ingredientsCount)
      .map(([id, quantity]) => {
        const ingredient = ingredientsMap[id];
        return ingredient ? { ...ingredient, quantity } : null;
      })
      .filter(Boolean) as Array<IIngredient & { quantity: number }>;
  };

  return (
    <section className={styles.list}>
      {orders.map(order => {
        const ingredientsImages = getIngredientsImages(order.ingredients);

        const totalPrice = ingredientsImages.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );

        return (
          <FeedCard
            key={order._id}
            number={order.number}
            name={order.name}
            ingredients={ingredientsImages}
            date={new Date(order.createdAt)}
            price={totalPrice}
            status={showStatus ? order.status : undefined}
            linkTo={`${baseLinkPath}/${order._id}`}
          />
        )
      })}
    </section>
  )
}
