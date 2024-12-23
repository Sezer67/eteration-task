import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Product } from '../../types/product.type'
import UIText from '../UI/UIText'
import Icon from 'react-native-vector-icons/FontAwesome'
import AddToCart from './AddToCart'
import { useNavigation } from '@react-navigation/native'
import FavButton from './FavButton'

const { width, height } = Dimensions.get('window')

type Props = {
    product: Product.Product
}

const ProductCart: React.FC<Props> = ({ product }) => {
    const navigation = useNavigation();

    const handlePressCart = () => {
        navigation.navigate('ProductDetail', { name: product.name })
    }

    const handlePressFavorite = () => {
        // isFav
    }

    return (
        <TouchableOpacity onPress={handlePressCart} style={styles.container}>
            <View>
                <View>
                    <Image
                        source={{ uri: product.image }}
                        style={styles.image}
                        resizeMode='cover'
                    />
                    <View style={styles.fav}>
                        <FavButton product={product} />
                    </View>
                </View>
                <View style={styles.textContainer}>
                    <UIText style={styles.price}>{product.price} ₺</UIText>
                    <UIText>{product.name}</UIText>
                </View>
            </View>
            <AddToCart product={product} />
        </TouchableOpacity>
    )
}

export default ProductCart

const styles = StyleSheet.create({
    container: {
        width: width * 0.45,
        paddingHorizontal: width * 0.025,
        paddingVertical: width * 0.05,
        backgroundColor: '#f8f8f8',
        borderRadius: 4,
        justifyContent: 'space-between'
    },
    image: {
        width: width * 0.4,
        height: width * 0.4,
    },
    fav: {
        position: 'absolute',
        right: 4,
        top: 4,
        zIndex: 99,
    },
    textContainer: {
        marginVertical: 8,
    },
    price: {
        color: 'blue',
        marginBottom: 2,
    }
})