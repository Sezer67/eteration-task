import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import UIText from './UIText'
import { useNavigation } from '@react-navigation/native'
import { headerHeight } from '../../constants'

type Props = {
    title: string;
    right?: React.JSX.Element
}

const { width } = Dimensions.get('window');

const UIHeader: React.FC<Props> = ({ title, right }) => {
    const navigation = useNavigation();
    const handlePressBack = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <TouchableOpacity style={styles.leftButton} onPress={handlePressBack}>
                    <Icon name='angle-left' size={28} color={'#000'} />
                </TouchableOpacity>
            </View>
            <UIText numberOfLines={1} type='h3' style={styles.title}>{title}</UIText>
            {
                right && (
                    <View style={styles.right}>
                        {right}
                    </View>
                )
            }
        </View>
    )
}

export default UIHeader

const styles = StyleSheet.create({
    container: {
        height: headerHeight,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 5,
        marginBottom: 8,
    },
    left: {
        position: 'absolute',
        left: 4
    },
    right: {
        position :'absolute',
        right: 8,
    },
    leftButton: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        textAlign: 'center',
        width: width * 0.7
    }
})