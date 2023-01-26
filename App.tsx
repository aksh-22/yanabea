import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React from 'react';
import InfoModal from 'src/components/InfoModal';
import colors from 'src/constants/colors';
import RootStackNavigator from 'src/routes/RootStackNavigator';
import {navigationRef} from 'src/utils/navigationRef';

const App = () => {
  return (
    <InfoModal>
      <NavigationContainer
        ref={navigationRef}
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: colors.defaultWhite,
            text: colors.defaultBlack,
          },
        }}>
        <RootStackNavigator />
      </NavigationContainer>
    </InfoModal>
  );
};

export default App;
