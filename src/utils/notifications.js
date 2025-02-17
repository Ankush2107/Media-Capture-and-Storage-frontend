import { createContext, useContext } from 'react';
import { useSnackbar } from 'notistack';

export const showNotification = (message, type = 'success') => {
  const { enqueueSnackbar } = useSnackbar();
  enqueueSnackbar(message, { 
    variant: type,
    autoHideDuration: 3000
  });
};