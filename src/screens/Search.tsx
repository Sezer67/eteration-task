import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import SearchHeader from '../components/Search/SearchHeader'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import SearchResult from '../components/Search/SearchResult'

const Search = () => {
  const searchState = useSelector((state: RootState) => state.search)

  return (
    <View style={styles.container}>
      <SearchHeader />
      <View style={{ flex: 1 }}>
        <SearchResult />
      </View>
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 12,
  }
})