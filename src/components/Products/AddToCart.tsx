import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useMemo } from 'react'
import UIText from '../UI/UIText'
import { RootState, useAppDispatch } from '../../store'
import { Product } from '../../types/product.type'
import { basketActions } from '../../store/basket.reducer'
import { useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'

type Props = {
  product: Product.Product
}

const AddToCart: React.FC<Props> = ({ product }) => {
  const basketState = useSelector((state: RootState) => state.basket);
  const basketItem = useMemo(() => {
    return basketState.find((each) => each.id === product.id);
  }, [product, basketState]);


  const dispatch = useAppDispatch();

  const handlePressAdd = () => {
    dispatch(basketActions.add({ ...product, quantity: 1 }));
  }

  const handlePressChangeQuantity = (action: 'minus' | 'plus') => { 
    const quantity = action === 'plus' ? 1 : -1;
    dispatch(basketActions.updateQuantity({ id: product.id, quantity }));
  }

  if (basketItem) {
    return (
      <View style={styles.quantityContainer}>
        <TouchableOpacity style={styles.quantityEachContainer} onPress={() => handlePressChangeQuantity('minus')}>
          <Icon name='minus' />
        </TouchableOpacity>
        <View style={[styles.quantityEachContainer, { borderRightWidth: 1, borderLeftWidth: 1, borderColor: 'black' }]} >
          <UIText>{basketItem.quantity}</UIText>
        </View>
        <TouchableOpacity style={styles.quantityEachContainer}  onPress={() => handlePressChangeQuantity('plus')}>
          <Icon name='plus' />
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <TouchableOpacity onPress={handlePressAdd} style={styles.container}>
      <UIText style={styles.text}>Sepete Ekle</UIText>
    </TouchableOpacity>
  )
}

export default AddToCart

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5962ff',
    borderRadius: 6
  },
  text: {
    color: 'white',
    fontWeight: '600'
  },
  quantityContainer: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#5962ff'
  },
  quantityEachContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})