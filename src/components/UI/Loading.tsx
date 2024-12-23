import React, { useEffect } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const { width, height } = Dimensions.get('window');

const Loading = () => {
    const appState = useSelector((state: RootState) => state.app);

    if (!appState.isLoading) {
    	return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.indicatorContainer}>
                <ActivityIndicator size='large' color='#000' />
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
        opacity: 0.1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    indicatorContainer: {
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 8,
    }
})

export default Loading;