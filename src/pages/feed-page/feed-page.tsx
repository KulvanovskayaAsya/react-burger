import React from 'react';

import commonStyles from '../../common.module.css';
import { FeedCard } from '../../components/feed-card/feed-card';
import { useSelector } from 'react-redux';
import { RootState } from '../../services';
import { selectIngredients } from '../../services/burgerIngredientsSlice';
import { OrdersStatistics } from '../../components/orders-statistics/orders-statistics';
import { OrdersStatus } from '../../components/orders-status/orders-status';

const feeds = {
  success: true,
  orders: [
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0942"
      ],
      _id: "",
      status: "done",
      number: 678,
      createdAt: "2021-06-23T14:43:22.587Z",
      updatedAt: "2021-06-23T14:43:22.603Z"
    }
  ],
  total: 1,
  totalToday: 1
}

export const FeedPage: React.FC = () => {
  const ingredients = useSelector((state: RootState) => selectIngredients(state));

  const getIngredientsDetails = (ids: string[]) => {
    return ids
      .map((id) => ingredients.find((ingredient) => ingredient._id === id))
      .filter(Boolean);
  };

  return (
    <>
      <h1 className={commonStyles.pageTitle}>Лента заказов</h1>
        <div className={commonStyles.flexContainer}>
          <div className={commonStyles.flexHalfChild}>
            {feeds.orders.map(feed => {
              const detailedIngredients = getIngredientsDetails(feed.ingredients);

              return (
                <FeedCard
                  key={feed._id}
                  number={feed.number}
                  ingredients={detailedIngredients}
                  date={new Date(feed.createdAt)}
                  price={560}
                  linkTo={`/feed/${feed._id}`}
                />
              )
            })}
            {/* <Feeds /> */}
          </div>
          <div className={commonStyles.flexHalfChild}>
            <OrdersStatus orders={feeds.orders} />
            <OrdersStatistics 
              total={feeds.total} 
              totalToday={feeds.totalToday} 
            />
          </div>
        </div>
    </>
  );
};
