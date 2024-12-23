import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import ProductList from '../components/Products/ProductList'
import EmptyContainer from '../components/EmptyContainer'

const Favorites = () => {
  const favoriteState = useSelector((state: RootState) => state.favorite);

  if(favoriteState.length < 1) {
    return <EmptyContainer
      text='Favori Listeniz Boş'
      icon='heart-o'
    />
  }

  return (
    <View style={styles.container}>
      <ProductList products={favoriteState} />
    </View>
  )
}

export default Favorites

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
})