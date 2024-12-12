import { IOrder } from './order';

export interface IFeed {
  success: boolean;
  orders: IOrder[];
  total: number;
  totalToday: number;
}
