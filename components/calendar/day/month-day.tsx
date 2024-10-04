import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { ColorOption } from '../../../data/colorOptions'

export default function MonthDay({ day, color }: { day: number; color: ColorOption }) {
 const bgColor = color.value
 const textColor = color.text

 return <Text style={[styles(bgColor, textColor).monthDay]}>{day}</Text>
}

const styles = (bg: string, text: string) =>
 StyleSheet.create({
  monthDay: {
   //  color: '#fff',
   width: 24,
   fontSize: 16,
   fontWeight: '600',
   textAlign: 'center',
   borderRadius: 4,
   paddingBottom: 2,
   marginRight: 9,
   marginTop: 8,
   backgroundColor: bg,
   color: text,
  },
 })
