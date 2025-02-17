import { useSnackbar } from 'notistack';

const useSnackbarHook = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showNotification = (message, variant = 'default') => {
    enqueueSnackbar(message, { variant });
  };

  return { showNotification };
};

export default useSnackbarHook;