import { useNotification } from '../context/NotificationContext';

const useSnackbarHook = () => {
  const { showNotification } = useNotification();
  return { showNotification };
};

export default useSnackbarHook;