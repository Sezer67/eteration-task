import { FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Banner from '../components/Banner';
import { storageUtils } from '../utils';
import { productService } from '../services';

const Home = () => {
  const [brands, setBrands] = useState<string[]>([]);

  const fetchBrands = async () => {
    const data = await productService.getProducts();
    const brands = [...new Set(data.map((item) => item.brand))];
    storageUtils.setBrandsStorage(brands);
    setBrands(brands);
  }

  const setBrandsFromStorage = async () => {
    const brands = await storageUtils.getBrandsStorage();
    if(brands) {
      setBrands(brands);
    } else {
      fetchBrands();
    }
  }

  useEffect(() => {
    setBrandsFromStorage();
  }, [])
  return (
    <View style={{ flex: 1 }}>
      <FlatList 
        keyExtractor={(_,i) => i.toString()}
        data={brands}
        renderItem={({ item, index }) => <Banner index={index} title={item} />}
        pagingEnabled
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})