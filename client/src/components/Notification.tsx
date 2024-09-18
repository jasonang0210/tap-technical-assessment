import { selectAllNotifications } from '@/redux/notifications/selectors';
import { dequeueNotification } from '@/redux/notifications/slice';
import {useSnackbar} from 'notistack';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const mapping = {
    "200": 'success',
    "400": 'error',
    "500": 'error'
}

const Notification = () => {
  const notifications = useSelector(selectAllNotifications);
  const dispatch = useDispatch();
  const {enqueueSnackbar} = useSnackbar();

  useEffect(() => {
    notifications.forEach(({message, status}) => {
      enqueueSnackbar(message, {
        variant: mapping[status]
    });
      dispatch(dequeueNotification());
    });
  }, [notifications, enqueueSnackbar, dispatch]);

  return null;
};

export default Notification;
