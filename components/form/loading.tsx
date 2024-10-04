import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'

export default function Loading() {
 return (
  <View style={styles.container}>
   <ActivityIndicator size='large' />
  </View>
 )
}

const styles = StyleSheet.create({
 container: {
  position: 'absolute',
  flexDirection: 'column',
  backgroundColor: '#0e0e0e',
  opacity: 0.9,
  height: '100%',
  width: '105%',
  flexGrow: 1,
  justifyContent: 'center',
  alignItems: 'center',
 },
})
