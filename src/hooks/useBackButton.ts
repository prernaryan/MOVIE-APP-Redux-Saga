import {useEffect} from 'react';
import {BackHandler} from 'react-native';

export default (handler: () => boolean) => {
  useEffect(() => {
    const backPressHandler = () => {
      if (handler) {
        return handler();
      } else {
        // goBack();
        return true;
      }
    };
    BackHandler.addEventListener('hardwareBackPress', backPressHandler);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backPressHandler);
    };
  }, [handler]);
};
