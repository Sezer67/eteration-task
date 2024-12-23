import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import BottomTab from './BottomTab';
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import SearchFilterScreen from '../screens/SearchFilterScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate('ProfileA', { userId: '' })}>
        <Text>Git</Text>
      </TouchableOpacity>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Profile Screen</Text>
    </View>
  );
}

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Root' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Root' component={BottomTab} />
        <Stack.Screen name='HomeA' component={HomeScreen} />
        <Stack.Screen name='ProfileA' component={ProfileScreen} />
        <Stack.Screen name='ProductList' component={ProductListScreen} />
        <Stack.Screen name='ProductDetail' component={ProductDetailScreen} />
        <Stack.Screen name='SearchFilter' component={SearchFilterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootStack

const styles = StyleSheet.create({})