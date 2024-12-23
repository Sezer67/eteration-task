import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useMemo } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { Product } from '../../types/product.type'
import { favoriteActions } from '../../store/favorites.reducer'

type Props = {
    product: Product.Product
}

const FavButton: React.FC<Props> = ({ product }) => {
    const favoriteState = useSelector((state: RootState) => state.favorite);
    const dispatch = useDispatch();

    const isFavorite = useMemo(() => {
        return !!favoriteState.find((each) => each.id === product.id);
    }, [favoriteState, product]);

    const handlePressFav = () => {
        if (isFavorite) {
            dispatch(favoriteActions.remove({ id: product.id }))
        } else {
            dispatch(favoriteActions.add(product));
        }
    }

    return (
        <TouchableOpacity testID="fav-button" onPress={handlePressFav}>
            <Icon testID='fav-icon' name={isFavorite ? 'heart' : 'heart-o'} size={24} color={isFavorite ? 'red' : 'black'} />
        </TouchableOpacity>
    )
}

export default FavButton

const styles = StyleSheet.create({})