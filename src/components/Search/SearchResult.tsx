import { ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ProductCart from '../Products/ProductCart';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { searchActions } from '../../store/search.reducer';
import UIText from '../UI/UIText';

const { width } = Dimensions.get('window');

const SearchResult = () => {
    const [loading, setLoading] = useState(false);
    const [isEnd, setIsEnd] = useState(false);
    const searchState = useSelector((state: RootState) => state.search);

    const dispatch = useDispatch();

    const fetchMore = () => {
        if (searchState.allProducts.length === searchState.result.length) {
            setIsEnd(true);
            return;
        }
        setLoading(true);
        dispatch(searchActions.nextStep());
        setLoading(false);
    }

  return (
    <FlatList
      keyExtractor={(item) => item.id}
      data={searchState.result}
      renderItem={({ item }) => <ProductCart product={item} />}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      ItemSeparatorComponent={() => <View style={{ marginBottom: width * 0.05 }} />}
      onEndReached={fetchMore}
      onEndReachedThreshold={0.2}
      ListFooterComponent={loading ? <ActivityIndicator size="large" color="blue" /> : isEnd ? <UIText style={{textAlign: 'center', marginVertical: 4 }}>Liste Sonuna Geldiniz</UIText> : null}
    />
  )
}

export default SearchResult

const styles = StyleSheet.create({
  columnWrapper: {
    justifyContent: 'space-around',
  }
})