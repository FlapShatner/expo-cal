import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View, StyleSheet, Pressable } from 'react-native'
import { ColorOption, colorOptions } from '../../../data/colorOptions'
import { useStore } from '../../../lib/store'

export default function Colors() {
  const setColor = useStore(state => state.setColor)

  const selectColor = async (color: ColorOption) => {
    setColor(color)
    try {
      await AsyncStorage.setItem('selectedColor', JSON.stringify(color))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      {colorOptions.map(color => <Pressable onPress={() => selectColor(color)} key={color.id} style={[styles.color, { backgroundColor: color.value }]} />)}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  color: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 5
  }
})
