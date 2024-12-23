import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Product } from '../../types/product.type'
import AddToCart from '../Products/AddToCart'
import UIText from '../UI/UIText'

type Props = {
    product: Product.Product
}

const BasketItem: React.FC<Props> = ({ product }) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Image 
            source={{ uri: product.image }}
            style={styles.image}
            resizeMode='cover'
        />
        <View style={{ marginLeft: 4, flexShrink: 1, marginRight: 8 }}>
            <UIText numberOfLines={2}>{product.name}</UIText>
            <UIText style={{ color: 'blue' }}>{product.price} ₺</UIText>
        </View>
      </View>
      <View style={styles.right}>
        <AddToCart product={product} /> 
      </View>
    </View>
  )
}

export default BasketItem

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 80,
        borderBottomWidth: 1,
    },
    left: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
    }, 
    right: {
        flex: 2,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 4,
    }
})