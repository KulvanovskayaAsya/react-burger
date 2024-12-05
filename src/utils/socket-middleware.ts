import type { Middleware, MiddlewareAPI } from 'redux';

import type {
  AppActions,
  TWSStoreActions,
  IMessage,
  AppDispatch,
  RootState,
  IMessageResponse,
} from '../types';
import { getCurrentTimestamp } from '../../utils/datetime';

export const socketMiddleware = (wsUrl: string, wsActions: TWSStoreActions): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: AppActions) => {
      const { dispatch, getState } = store;
      const { type } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
      const { user } = getState().user;
      if (type === wsInit && user) {
        socket = new WebSocket(`${wsUrl}?token=${user.token}`);
      }
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData: IMessageResponse = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: { ...restParsedData, timestamp: getCurrentTimestamp() } });
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsSendMessage) {
          const payload = { ...action.payload, token: user.token };
          socket.send(JSON.stringify(payload));
        }
      }

      next(action);
    };
  }) as Middleware;
};
