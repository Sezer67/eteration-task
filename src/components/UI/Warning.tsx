import React, { useEffect } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import UIText from './UIText';
import { appActions } from '../../store/app.reducer';

const { width, height } = Dimensions.get('window');

const Warning = () => {
    const appState = useSelector((state: RootState) => state.app);
    const dispatch = useDispatch();
    
    if (!appState.warning.active) {
    	return null;
    }

    const handlePressClose = () => {
        dispatch(appActions.setWarning({ active: false, message: '' }));
    }

    return (
        <View style={styles.container}>
            <View style={styles.messageContainer}>
                <UIText>{appState.warning.message}</UIText>
                <TouchableOpacity onPress={handlePressClose} style={styles.button}>
                    <UIText>TAMAM</UIText>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width,
        height,
        position: 'absolute',
        flex: 1,
        opacity: 0.6,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    messageContainer: {
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 8,
    },
    button: {
        marginTop: 12,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 8,
    }
})

export default Warning;