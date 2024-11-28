import React from 'react';

import {Keyboard, KeyboardEvent} from 'react-native';
import {useKeyboardType} from '../types/hook.type';

export const useKeyboard = (): useKeyboardType => {
  const [isKeyboardShown, setKeyboardStatus] = React.useState<boolean>(false);
  const [keyboardHeight, setKeyboardHeight] = React.useState<number>(0);
  React.useEffect(() => {
    const showSubscription = Keyboard.addListener(
      'keyboardDidShow',
      (event: KeyboardEvent) => {
        setKeyboardStatus(true);
        setKeyboardHeight(event.endCoordinates.height);
      },
    );
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
      setKeyboardHeight(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return {isKeyboardShown, keyboardHeight};
};
