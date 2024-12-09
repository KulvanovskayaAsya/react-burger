import React, { useEffect, useMemo } from 'react';

import { OrdersStatistics } from '@/components/orders-statistics/orders-statistics';
import { OrdersStatus } from '@/components/orders-status/orders-status';
import { OrdersList } from '@/components/orders-list/orders-list';
import { RootState, useDispatch, useSelector } from '@/services';
import { wsClose, wsConnecting } from '@/services/feed-slice';
import FlexContainer from '@/layouts/flex-container/flex-container';

import commonStyles from '@/common.module.css';
import { EOrderStatus } from '@/types/order';

export const FeedPage: React.FC = () => {
  const dispatch = useDispatch();
  const { orders, total, totalToday } = useSelector(
    (state: RootState) => state.feed
  );

  useEffect(() => {
    const wsUrl = 'wss://norma.nomoreparties.space/orders/all';
    dispatch(wsConnecting(wsUrl));

    return () => {
      dispatch(wsClose());
    };
  }, []);

  const readyOrders = useMemo(() => (
    orders.filter((order) => order.status === 'done').map((order) => order.number)
  ), [orders]);

  const inProgressOrders = useMemo(() => (
    orders.filter((order) => order.status === 'pending').map((order) => order.number)
  ), [orders]);

  return (
    <div>
      <h1 className={commonStyles.pageTitle}>Лента заказов</h1>
        <div className={commonStyles.flexContainer}>
          <div className={commonStyles.flexHalfChild}>
            <OrdersList orders={orders} baseLinkPath="/feed" />
          </div>
          <div className={commonStyles.flexHalfChild}>
            <FlexContainer flexDirection='column' gap='60px'>
              <FlexContainer gap='36px'>
                <OrdersStatus
                  title="Готовы:"
                  orders={readyOrders}
                  status={EOrderStatus.Done}
                />
                <OrdersStatus
                  title="В работе:"
                  orders={inProgressOrders}
                  status={EOrderStatus.Pending}
                />
              </FlexContainer>
              <OrdersStatistics
                title='Выполнено за все время:'
                value={total}
              />
              <OrdersStatistics
                title='Выполнено за сегодня:'
                value={totalToday}
              />
            </FlexContainer>
          </div>
        </div>
    </div>
  );
};
