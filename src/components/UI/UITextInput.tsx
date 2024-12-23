import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'

type Props = {
    icon?: string;
    inputProps?: TextInputProps
}

const UITextInput: React.FC<Props> = ({ icon, inputProps }) => {
    return (
        <View style={styles.container}>
            {
                icon && (
                    <View style={styles.icon}>
                        <Icon name={icon} size={20} color={'#c8c8c8'} />
                    </View>
                )
            }
            <TextInput
                style={[styles.input, icon ? { paddingLeft: 32 } : { paddingLeft: 8 }]}
                {...inputProps}
            />
        </View>
    )
}

export default UITextInput

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    input: {
        backgroundColor: '#f8f8f8',
        borderWidth: 1,
        borderColor: '#5962ff',
        borderRadius: 8,
        height: 40,
    },
    icon: {
        position: 'absolute',
        zIndex: 99,
        left: 8,
        top: 8
    }
})