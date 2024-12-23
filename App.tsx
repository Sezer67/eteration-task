import React from 'react';
import { StyleSheet } from 'react-native';
import RootStack from './src/navigation/RootStack';
import { initialWindowMetrics, SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Loading from './src/components/UI/Loading';
import Warning from './src/components/UI/Warning';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <SafeAreaView style={styles.container}>
        <RootStack />
        <Loading />
        <Warning />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})

export default App;
