import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';

type RootStackParamList = {
  Home: undefined;
  Detail: { pokemonName: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
