import {StyleSheet} from 'react-native';
import {ConstNumber} from './numbers';
import {widthPixel} from '../utils/responsve';

export enum GlobalStyleValues {
  RELATIVE = 'relative',
  CENTER = 'center',
  ROW = 'row',
  SPACE_BETWEEN = 'space-between',
  SPACE_AROUND = 'space-around',
  SPACE_EVENLY = 'space-evenly',
  ABSOLUTE = 'absolute',
  FLEX_START = 'flex-start',
  FLEX_END = 'flex-end',
  TOP = 'top',
  BOTTOM = 'bottom',
  CONTAIN = 'contain',
  UNDERLINE = 'underline',
  HIDDEN = 'hidden',
  DASHED = 'dashed',
  COVER = 'cover',
  HANDLED = 'handled',
  LARGE = 'large',
  NONE = 'none',
  COLUMN = 'column',
  DOTTED = 'dotted',
  STRETCH = 'stretch',
  TransParent = 'transparent',
  NORMAL = 'normal',
  RIGHT = 'right',
  BASELINE = 'baseline',
  WRAP = 'wrap',
  AUTO = 'auto',
  LEFT = 'left',
  LIGHT = 'light',
  SMALL = 'small',
  DARK_CONTENT = 'dark-content',
}

export const StyleBase = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  justRow: {
    flexDirection: GlobalStyleValues.ROW,
  },
  inRow: {
    alignItems: GlobalStyleValues.CENTER,
    flexDirection: GlobalStyleValues.ROW,
  },
  inCenter: {
    justifyContent: GlobalStyleValues.CENTER,
    alignItems: GlobalStyleValues.CENTER,
  },
  selfCenter: {
    alignSelf: GlobalStyleValues.CENTER,
  },
  spaceBetween: {
    justifyContent: GlobalStyleValues.SPACE_BETWEEN,
  },
  alignSelfEnd: {
    alignSelf: GlobalStyleValues.FLEX_END,
  },
  alignSelfStart: {
    alignSelf: GlobalStyleValues.FLEX_START,
  },
  center: {
    justifyContent: GlobalStyleValues.CENTER,
  },
  alignCenter: {
    alignItems: GlobalStyleValues.CENTER,
  },
  absolutePosition: {
    position: GlobalStyleValues.ABSOLUTE,
  },
  textAlignCenter: {
    textAlign: GlobalStyleValues.CENTER,
  },
  wrapRow: {
    flexDirection: GlobalStyleValues.ROW,
    flexWrap: GlobalStyleValues.WRAP,
    justifyContent: GlobalStyleValues.FLEX_START,
  },
  underLineText: {
    textDecorationLine: GlobalStyleValues.UNDERLINE,
  },
  inRowSpacing: {
    alignItems: GlobalStyleValues.CENTER,
    flexDirection: GlobalStyleValues.ROW,
    justifyContent: GlobalStyleValues.SPACE_BETWEEN,
  },
  absoluteCenterPosition: {
    position: GlobalStyleValues.ABSOLUTE,
    top: ConstNumber.VALUE_0,
    bottom: ConstNumber.VALUE_0,
    right: ConstNumber.VALUE_0,
    left: ConstNumber.VALUE_0,
  },
  appPadding: {paddingHorizontal: widthPixel(ConstNumber.VALUE_30)},
});
