import React from 'react'
import { Text, StyleSheet, StyleProp } from 'react-native'

function ThemeText({ children, style }: { children: React.ReactNode; style?: StyleProp<any> }) {
  return (
    <Text style={[styles.text, style]}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  text: {
    color: '#FBFBFB'
  }
})

export default ThemeText
