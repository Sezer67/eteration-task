import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Product } from '../../types/product.type'
import ProductCart from './ProductCart'

const { width } = Dimensions.get('window');

type Props = {
  products: Product.Product[]
}

const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <FlatList
      keyExtractor={(item) => item.id}
      data={products}
      renderItem={({ item }) => <ProductCart product={item} />}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      ItemSeparatorComponent={() => <View style={{ marginBottom: width * 0.05 }} />}
    />
  )
}

export default ProductList

const styles = StyleSheet.create({
  columnWrapper: {
    justifyContent: 'space-around',
  }
})