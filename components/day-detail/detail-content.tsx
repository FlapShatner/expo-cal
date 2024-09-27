import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ColorOption } from '../../data/colorOptions'

export default function DetailContent({ color }: { color: ColorOption }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: color.text }]}>Detail Content</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '98%',
    height: '65%',
    backgroundColor: '#0e0e0e'
  },
  text: {
    fontSize: 20
  }
})
