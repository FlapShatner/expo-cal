import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

function Day({ color }: { color: string }) {
 return (
  <View style={styles.dayContainer}>
   <Image
    source={require('../assets/cal_assets/bg_lg.png')}
    style={styles.bg}
   />
   <View style={styles.inner} />
   <View style={[styles.header, { backgroundColor: color }]} />
  </View>
 )
}

const styles = StyleSheet.create({
 dayContainer: {
  position: 'relative',
  width: 80,
  height: 80,
 },
 bg: {
  position: 'absolute',
  top: 0,
  left: 0,
  width: 80,
  height: 80,
 },
 inner: {
  position: 'absolute',
  backgroundColor: '#0e0e0e',
  borderRadius: 14,
  top: 8,
  left: 3,
  width: 71,
  height: 71,
 },
 header: {
  position: 'absolute',
  top: 6,
  left: 4,
  width: 69,
  borderTopStartRadius: 10,
  borderTopEndRadius: 10,
  height: 12,
 },
})

export default Day
