import {ToastAndroid} from 'react-native';

export const showToast = (message) => {
  const defaultMessage = message?message: 'Thành công'

  ToastAndroid.showWithGravity(
    defaultMessage,
    ToastAndroid.SHORT,
    ToastAndroid.CENTER,
  );
};
