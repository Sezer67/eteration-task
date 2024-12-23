import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import UIHeader from '../components/UI/UIHeader'
import Accordion from 'react-native-collapsible/Accordion'
import UIText from '../components/UI/UIText'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Store } from '../types/store.type'
import { searchActions } from '../store/search.reducer'
import { getActiveFilters, updateCheckFilter } from '../utils'
import { productService } from '../services'
import { useNavigation } from '@react-navigation/native'


const SearchFilterScreen = () => {

    const searchState = useSelector((state: RootState) => state.search);
    const [activeSections, setActiveSections] = useState<number[]>([]);
    const [activeSectionTitle, setActiveSectionTitle] = useState<string | undefined>();
    const [sections, setSections] = useState(searchState.filter);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handlePressCheck = async (title: 'Model' | 'Marka', name: string) => {
        const newFilter = updateCheckFilter(sections, title, name);
        setSections(newFilter);
    }

    const handlePressAction = async () => {
        const activeFilters = getActiveFilters(sections);
        const query: any = {}
        if (activeFilters.brand) query.brand = activeFilters.brand;
        if (activeFilters.model) query.model = activeFilters.model;
        if (searchState.searchTerm) query.search = searchState.searchTerm;

        const data = await productService.getProducts(query);
        dispatch(searchActions.setAllProducts(data));
        navigation.goBack();
    }

    const renderContent = (section: Store.State.Filter) => {
        return (
            <FlatList
                data={section.data}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item, index }) => {
                    return (
                        <View style={styles.contentContainer}>
                            <TouchableOpacity onPress={() => handlePressCheck(section.title, item.name)} style={styles.checkBox}>
                                {
                                    item.check && (
                                        <Icon name='check' size={12} color={'black'} />
                                    )
                                }
                            </TouchableOpacity>
                            <UIText>{item.name}</UIText>
                        </View>
                    )
                }}
            />
        )
    }
    const renderHeader = (section: Store.State.Filter) => {
        return (
            <View style={styles.titleContainer}>
                <UIText style={{ fontWeight: '600' }}>{section.title}</UIText>
                <Icon name={activeSectionTitle === section.title ? 'minus' : 'plus'} size={18} color={'black'} />
            </View>
        )
    }
    const onChange = (indexes: number[]) => {
        setActiveSections(indexes);
        if (indexes[0] !== undefined) {
            const activeSection = searchState.filter[indexes[0]];
            setActiveSectionTitle(activeSection.title);
        } else {
            setActiveSectionTitle(undefined);
        }
    }

    const handlePressClear = async () => {
        const query: any = {}
        if (searchState.searchTerm) query.search = searchState.searchTerm;
        
        const data = await productService.getProducts(query);
        dispatch(searchActions.setAllProducts(data));
        navigation.goBack();
    }
    return (
        <View style={styles.container}>
            <UIHeader title='Filtrele' right={<TouchableOpacity onPress={handlePressClear}><UIText>Temizle</UIText></TouchableOpacity>} />
            <View style={{ paddingHorizontal: 12 }}>
                <Accordion
                    sections={sections}
                    activeSections={activeSections}
                    onChange={onChange}
                    renderContent={renderContent}
                    renderHeader={renderHeader}
                    expandMultiple={false}
                    touchableComponent={TouchableOpacity}
                    touchableProps={{ activeOpacity: 0.65 }}
                />
            </View>
            <View>
                <TouchableOpacity onPress={handlePressAction}>
                    <UIText>Uygula</UIText>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SearchFilterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    scrollContent: {
        flexGrow: 1,
    },
    titleContainer: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 6
    },
    contentContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 4,

    },
    checkBox: {
        width: 20,
        height: 20,
        borderRadius: 2,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 6
    }
})