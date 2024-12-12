export enum EOrderStatus {
  Done = 'done',
  Pending = 'pending',
  Created = 'created',
}

export interface IOrder {
  _id: string;
  ingredients: string[];
	status: EOrderStatus;
  number: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}
