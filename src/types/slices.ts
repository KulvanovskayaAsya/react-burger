export enum STATUS {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed'
}

export interface IBaseSliceState {
  status: STATUS;
  error: string | null;
}
