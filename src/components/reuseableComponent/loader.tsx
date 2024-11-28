import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
import {height, heightPixel, widthPixel} from '../../utils/responsve';
import {colors, ConstNumber, GlobalStyleValues} from '../../constants';

const styles = {
  container: {
    position: GlobalStyleValues.ABSOLUTE,
    top: heightPixel(height / ConstNumber.VALUE_2),
    alignSelf: GlobalStyleValues.CENTER,
    width: widthPixel(ConstNumber.VALUE_50),
    height: widthPixel(ConstNumber.VALUE_50),
    alignItems: GlobalStyleValues.CENTER,
    justifyContent: GlobalStyleValues.CENTER,
    borderRadius: widthPixel(ConstNumber.VALUE_45),
    zIndex: ConstNumber.VALUE_99999,
  },
};
const Loader = () => {
  const loaderState = useSelector(state => state.loader);
  if (loaderState.loading) {
    return (
      <View
        style={[styles.container, {backgroundColor: colors.blue.loginText}]}>
        <ActivityIndicator
          color={colors.white.light_white}
          size={widthPixel(ConstNumber.VALUE_25)}
        />
      </View>
    );
  }
  return null;
};
export default Loader;
