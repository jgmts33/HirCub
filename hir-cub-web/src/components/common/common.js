
import { toast } from 'react-toastify';

export const showSuccessToast = () => {
  toast.success('We saved the settings to your library.');
};

export const showErrorToast = (err) => {
  if (err == 'error') {
    toast.error('An error has occurred');
  } else {
    toast.error(err);
  }
};

