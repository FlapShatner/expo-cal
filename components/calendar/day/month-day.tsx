import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { ColorOption } from '../../../data/colorOptions'

export default function MonthDay({ day, color }: { day: number; color: ColorOption }) {
  return (
    <Text style={[styles.monthDay, { backgroundColor: color.value, color: color.text }]}>
      {day}
    </Text>
  )
}

const styles = StyleSheet.create({
  monthDay: {
    color: '#fff',
    width: 24,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    borderRadius: 4,
    paddingBottom: 2,
    marginRight: 9,
    marginTop: 8
  }
})
