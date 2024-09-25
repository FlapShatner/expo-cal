import React from 'react'
import { Text, StyleSheet, useColorScheme, StyleProp } from 'react-native'

function ThemeText({ children, style }: { children: React.ReactNode; style?: StyleProp<any> }) {
 const colorScheme = useColorScheme()
 const textTheme = colorScheme === 'dark' ? 'darkText' : 'lightText'
 return <Text style={[styles[textTheme], style]}>{children}</Text>
}

const styles = StyleSheet.create({
 lightText: {
  color: '#1A1A1A',
 },
 darkText: {
  color: '#FBFBFB',
 },
})

export default ThemeText
