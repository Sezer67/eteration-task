import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import UIText from '../components/UI/UIText';
import BasketItem from '../components/Basket/BasketItem';
import { basketActions } from '../store/basket.reducer';
import EmptyContainer from '../components/EmptyContainer';

const Basket = () => {
  const basketState = useSelector((state: RootState) => state.basket);
  const dispatch = useDispatch();

  const totalPrice = useMemo(() => {
    let price = 0;
    basketState.forEach((each) => {
      price += each.quantity * Number(each.price)
    });
    return price;
  }, [basketState]);

  const handlePressComplete = () => {
    dispatch(basketActions.complete());
  }

  if(basketState.length < 1) {
    return <EmptyContainer
      text='Alışveriş Sepetiniz Boş'
      icon='shopping-basket'
    />
  }

  return (
    <View style={styles.container}>
      <FlatList 
        data={basketState}
        keyExtractor={(_,index) => index.toString()}
        renderItem={({item}) => <BasketItem product={item} />}
      />
      <View style={styles.footer}>
        <UIText>Toplam: {totalPrice} ₺</UIText>
        <TouchableOpacity onPress={handlePressComplete} style={styles.completeButton}>
          <UIText style={{ color: 'white' }}>Tamamla</UIText>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Basket

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  completeButton: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5962ff',
    width: '50%',
    borderRadius: 8
  }
})