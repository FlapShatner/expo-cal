import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { ColorOption } from '../../../data/colorOptions'

export default function Weekday({ weekday, color }: { weekday: string; color: ColorOption }) {
 const bgColor = color.value
 const textColor = color.text
 return (
  <View style={[styles.weekdayContainer, { backgroundColor: bgColor }]}>
   <Text style={[styles.weekdayText, { color: textColor }]}>{weekday}</Text>
  </View>
 )
}

const styles = StyleSheet.create({
 weekdayContainer: {
  display: 'flex',
  alignItems: 'center',
  borderRadius: 4,
  width: 54,
  paddingBottom: 1,
  marginTop: 9,
  marginLeft: 9,
 },
 weekdayText: {
  fontSize: 11,
  fontWeight: '600',
 },
})
