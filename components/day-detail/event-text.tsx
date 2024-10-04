import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { ColorOption } from '../../data/colorOptions'

export default function EventText({ children, color, style }: { children: React.ReactNode; color: ColorOption; style?: any }) {
 const bgColor = color.value
 return <Text style={[styles.text, { color: bgColor }, style]}>{children}</Text>
}

const styles = StyleSheet.create({
 text: {
  fontSize: 14,
  fontWeight: 'bold',
 },
 textTruncate: {
  flexWrap: 'nowrap',
  flex: 1,
 },
 summaryText: {
  fontSize: 14,
  fontWeight: 'bold',
 },
 textWrap: {
  flex: 1,
  flexWrap: 'wrap',
  width: 1,
 },
})
