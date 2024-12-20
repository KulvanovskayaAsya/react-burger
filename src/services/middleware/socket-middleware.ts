import type { Middleware } from '@reduxjs/toolkit';
import type { RootState } from '@/services';
import type { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from '@reduxjs/toolkit';

export type TWsActions<R, S> = {
  connect: ActionCreatorWithPayload<string>;
  disconnect: ActionCreatorWithoutPayload;
  onConnecting?: ActionCreatorWithoutPayload;
  onOpen?: ActionCreatorWithoutPayload;
  onClose?: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<R>;
  sendMessage?: ActionCreatorWithPayload<S>;
};

const RECONNECT_PERIOD = 3000;

export const socketMiddleware = <R, S>(
  wsActions: TWsActions<R, S>
): Middleware<{}, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    let reconnectTimer: NodeJS.Timeout | null = null;
    let isConnected = false;
    let url = '';

    const {
      connect,
      disconnect,
      onConnecting,
      onOpen,
      onClose,
      onError,
      onMessage,
      sendMessage,
    } = wsActions;

    const clearSocket = () => {
      if (socket) {
        socket.onopen = null;
        socket.onclose = null;
        socket.onmessage = null;
        socket.onerror = null;
        socket.close();
        socket = null;
      }
    };

    return (next) => (action) => {
      const { dispatch } = store;

      if (connect.match(action)) {
        if (socket) {
          clearSocket();
        }

        url = action.payload;
        isConnected = true;

        if (onConnecting) {
          dispatch(onConnecting());
        }

        socket = new WebSocket(url);

        socket.onopen = () => {
          if (onOpen) {
            dispatch(onOpen());
          }
        };

        socket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            dispatch(onMessage(data));
          } catch (err) {
            dispatch(onError((err as Error).message));
          }
        };

        socket.onerror = (event) => {
          dispatch(onError('WebSocket error'));
        };

        socket.onclose = () => {
          if (onClose) {
            dispatch(onClose());
          }

          clearSocket();

          if (isConnected) {
            reconnectTimer = setTimeout(() => {
              dispatch(connect(url));
            }, RECONNECT_PERIOD);
          }
        };
      }

      if (disconnect.match(action)) {
        isConnected = false;
        clearSocket();

        if (reconnectTimer) {
          clearTimeout(reconnectTimer);
          reconnectTimer = null;
        }
      }

      if (socket && sendMessage?.match(action)) {
        socket.send(JSON.stringify(action.payload));
      }

      return next(action);
    };
  };
};
