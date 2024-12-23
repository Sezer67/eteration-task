import { Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types'
import UIHeader from '../components/UI/UIHeader'
import UIText from '../components/UI/UIText'
import { Product } from '../types/product.type'
import { productService } from '../services'
import UIAccordion from '../components/UI/UIAccordion'
import AddToCart from '../components/Products/AddToCart'
import { LOREM_TEXT } from '../constants'
import FavButton from '../components/Products/FavButton'

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetail'>

const ProductDetailScreen: React.FC<Props> = ({ navigation, route }) => {
    const [product, setProduct] = useState<Product.Product>();
    const sections = useMemo(() => {
        if (!product) return [];
        return [
            {
                title: 'Ürün Bilgileri',
                content: `Marka: ${product.brand}\n\nModel: ${product.model}`
            },
            {
                title: 'Ürün Açıklaması',
                content: product.description
            },
            {
                title: 'Teslimat ve İade Koşulları',
                content: LOREM_TEXT
            },
        ]
    }, [product])
    const { name } = route.params;

    const fetchProduct = async () => {
        const data = await productService.getProducts({ name });
        setProduct(data[0]);
    }

    useEffect(() => {
        fetchProduct();
    }, [name]);

    if (!product) return null;

    return (
        <View style={styles.container}>
            <UIHeader title={name} />
            <ScrollView
                // stickyHeaderIndices={[0]}
                contentContainerStyle={styles.scrollContent}
                scrollEventThrottle={16}
            >
                <View style={styles.viewContainer}>
                    {/* birden fazla resim için swiper */}
                    <View style={{ width: '100%', height: height * 0.4 }}>
                        <Image
                            source={{ uri: product.image }}
                            style={styles.image}
                            resizeMode='contain'
                        />
                    </View>
                    <View>
                        <View style={[styles.row, { justifyContent: 'space-between' }]}>
                            <UIText style={{ width: width*0.85 }} numberOfLines={2} type='h2'>{product.name}</UIText>
                            <View style={{ marginRight: 4 }}>
                                <FavButton product={product} />
                            </View>
                        </View>
                        <View style={[styles.row, { marginVertical: 6 }]}>
                            <UIText>Ürün Fiyatı: </UIText>
                            <UIText style={{ color: 'blue' }}>{product.price} ₺</UIText>
                        </View>
                        <UIText style={{ color: '#c8c8c8', marginBottom: 4 }}>{LOREM_TEXT}</UIText>
                    </View>
                    <UIAccordion
                        sections={sections}
                    />
                </View>
            </ScrollView>
            <View style={styles.stickyFooter}>
                <AddToCart product={product} />
            </View>
        </View>
    )
}

export default ProductDetailScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollContent: {
        flexGrow: 1,
    },
    viewContainer: {
        flex: 1,
        paddingHorizontal: 12,
    },
    image: {
        width: '100%',
        height: '100%'
    },
    stickyFooter: {
        width: '100%',
        paddingHorizontal: 12,
        marginBottom: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})