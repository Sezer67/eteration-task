import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { bottomTabBarHeight } from './../constants';
import UIText from './UI/UIText';
import { initialWindowMetrics, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const colors = ['#FF5733', '#33FF57', '#3357FF'];
const getColorForIndex = (index: number) => {
  return colors[index % colors.length];
}

type Props = {
  title: string;
  index: number;
}

const Banner: React.FC<Props> = ({ title, index }) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  
  const verticalInset = insets.bottom + insets.top || initialWindowMetrics?.frame.y || 0;
  const bg = getColorForIndex(index);

  const handlePress = () => {
    navigation.navigate('ProductList', { brand: title });
  }

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={1} style={[styles.container, { backgroundColor: bg, height: height - bottomTabBarHeight - verticalInset }]}>
      <UIText type='h1' style={{ color: 'white' }}>{title}</UIText>
    </TouchableOpacity>
  )
}

export default Banner

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    justifyContent: 'center',
    alignItems: 'center',
  }
})