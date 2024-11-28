import {View, Text} from 'react-native';
import React from 'react';

type Props = {
  text: string;
};
const AppText = (props: Props) => {
  return (
    <View>
      <Text>{props.text}</Text>
    </View>
  );
};

export default React.memo(AppText);
