import {View} from 'react-native';
import React from 'react';
import FlashMessage from 'react-native-flash-message';
import {ConstNumber} from './src/constants';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Main from './src/navigation/Main';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import Loader from './src/components/reuseableComponent/loader';

type Props = {};

const App = (props: Props) => {
  return (
    <Provider store={store}>
      <SafeAreaProvider style={{flex: ConstNumber.VALUE_1}}>
        <View style={{flex: ConstNumber.VALUE_1}}>
          <FlashMessage position="top" />
          <Main />
          <Loader />
        </View>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
