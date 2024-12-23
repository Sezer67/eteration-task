import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import UIText from './UI/UIText'
import Icon from 'react-native-vector-icons/FontAwesome'

type Props = {
    text: string,
    icon?: string
}

const EmptyContainer: React.FC<Props> = ({ text, icon }) => {
    return (
        <View style={styles.container}>
            <UIText type='h2'>{text}</UIText>
            {
                icon && (
                    <Icon name={icon} size={40} color={'#c8c8c8'} style={styles.icon} />
                )
            }
        </View>
    )
}

export default EmptyContainer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        marginTop: 12
    }
})