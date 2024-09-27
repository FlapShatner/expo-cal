import React from 'react'
import { Pressable, View, StyleSheet } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function Trigger({ handleBurgerPress }: { handleBurgerPress: () => void }) {
  return (
    <View style={styles.openContainer}>
      <Pressable style={[styles.button, styles.buttonOpen]} onPress={handleBurgerPress}>
        <Ionicons name="menu" size={42} color="#FBFBFB" />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 10
  },
  buttonOpen: {
    position: 'absolute',
    top: 0,
    left: 150,
    backgroundColor: 'transparent'
  },
  openContainer: {
    marginLeft: 'auto'
  }
})
