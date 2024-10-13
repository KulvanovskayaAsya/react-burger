export enum STATUS {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed'
}

export interface BaseSliceState {
  status: STATUS;
  error: string | null;
}
