import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import UITextInput from '../UI/UITextInput'
import UIText from '../UI/UIText'
import { productService } from '../../services'
import { useDispatch } from 'react-redux'
import { searchActions } from '../../store/search.reducer'
import { useNavigation } from '@react-navigation/native'

const ALL_PRODUCTS_TEXT = 'Tüm Ürünler';

const SearchHeader = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [storeDataIsAllProduct, setStoreDataIsAllProduct] = useState<boolean>(false);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const fetchProductsBySearchTerm = async () => {
        const data = await productService.getProducts({ search: searchTerm });
        setStoreDataIsAllProduct(false);
        dispatch(searchActions.setAllProducts(data));
        dispatch(searchActions.setResult(data));
    }

    const fetchAllProducts = async () => {
        // apide size&page mantığı bulunamadı. Ürünler çekilecek app içinde infinite yapılacak.
        if(storeDataIsAllProduct) return;
        const data = await productService.getProducts();
        dispatch(searchActions.setAllProducts(data));
        setStoreDataIsAllProduct(true);
    }

    useEffect(() => {
        if(searchTerm.length > 2) {
            fetchProductsBySearchTerm();
        } else {
            fetchAllProducts();
        }
        dispatch(searchActions.setSearchTerm(searchTerm));
    }, [searchTerm]);

    const handlePressFilter = () => {
        navigation.navigate('SearchFilter');
    }

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <View style={{ flex: 1 }}>
                    <UITextInput 
                        icon='search' 
                        inputProps={{
                            value: searchTerm,
                            onChangeText: (text) => setSearchTerm(text),
                        }}    
                    />
                </View>
            </View>
            <View style={styles.bottom}>
                <TouchableOpacity style={styles.button}>
                    <UIText>Sırala</UIText>
                </TouchableOpacity>
                <View style={{ width: 10, height: 1 }} />
                <TouchableOpacity onPress={handlePressFilter} style={styles.button}>
                    <UIText>Filtrele</UIText>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SearchHeader

const styles = StyleSheet.create({
    container: {
        height: 100,
        justifyContent: 'space-around'
    },
    top: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        height: 40,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 6,
        borderColor: 'black'
    }
})