export interface IOrder {
  _id: string;
  ingredients: string[]; 
  status: 'done' | 'pending' | 'created';
  number: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface IFeed {
  success: boolean;
  orders: IOrder[];
  total: number;
  totalToday: number;
}
