import socketIOClient from 'socket.io-client';
import { addNotification } from '../../redux/actionCreator/notificationsActions';
import store from '../../redux/store/store';
import { resolveBaseUrl } from '../../services';

const baseUrl = resolveBaseUrl();

const serverUrl = baseUrl.replace('/api/v1', '');

const io = socketIOClient(serverUrl);

export default function handleManagerNotification(userId) {
  io.on('notification', (data) => {
    if (data.recipientId === userId) {
      store.dispatch(addNotification(data));
    }
  });
}

