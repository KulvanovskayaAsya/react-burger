import React, { useEffect } from 'react';

import { FeedList } from '@/components/feed-list/feed-list';
import { RootState, useDispatch, useSelector } from '@/services';
import { wsClose, wsConnecting } from '@/services/profile-orders-slice';

export const ProfileOrdersPage: React.FC = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector(
    (state: RootState) => state.profileOrders
  );

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')?.replace('Bearer ', '');
    const wsUrl = `wss://norma.nomoreparties.space/orders?token=${accessToken}`;
    dispatch(wsConnecting(wsUrl));

    return () => {
      dispatch(wsClose());
    };
  }, []);

  return <FeedList orders={orders} baseLinkPath="/profile/orders" showStatus />;
};
