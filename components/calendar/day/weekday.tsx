import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { ColorOption } from '../../../data/colorOptions'

export default function Weekday({ weekday, color }: { weekday: string; color: ColorOption }) {
  return (
    <View style={[styles.weekdayContainer, { backgroundColor: color.value }]}>
      <Text style={[styles.weekdayText, { color: color.text }]}>
        {weekday}
      </Text>
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
    marginLeft: 9
  },
  weekdayText: {
    fontSize: 11,
    fontWeight: '600'
  }
})
