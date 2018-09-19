import socketIOClient from 'socket.io-client';
import toast from 'toastr';
import store from '../../redux/store/store';
import { addNotification } from '../../redux/actionCreator/notificationsActions';

const io = socketIOClient('http://127.0.0.1:5000');

export default function handleNotification(userId) {
  io.on('notification', (data) => {
    if (data.recipientId === userId) {
      store.dispatch(addNotification(data));
    }
  });
}
