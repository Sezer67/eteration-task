import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types'
import { Product } from '../types/product.type';
import { productService } from '../services';
import ProductList from '../components/Products/ProductList';
import UIHeader from '../components/UI/UIHeader';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductList'>;

const ProductListScreen: React.FC<Props> = ({ navigation, route }) => {
    const { brand } = route.params;
    const [products, setProducts] = useState<Product.Product[]>([]);

    const fetchProductsByBrand = async () => {
        const data = await productService.getProducts({ brand })
        setProducts(data);
    }

    useEffect(() => {
        fetchProductsByBrand();
    }, [brand]);

    return (
        <View style={styles.container}>
            <UIHeader title={brand} />
            <ProductList products={products} />
        </View>
    )
}

export default ProductListScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})