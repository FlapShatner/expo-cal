import dayjs from 'dayjs'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ColorOption } from '../../data/colorOptions'

export default function DetailHeader({ color, date }: { color: ColorOption; date: string }) {
  const dayLabel = dayjs(date).format('dddd')
  return (
    <View style={styles.header}>
      <Text style={[styles.headerText, { color: color.text }]}>
        {dayLabel}
      </Text>
      <Text style={[styles.dateText, { color: color.text }]}>
        {dayjs(date).format('MMMM D, YYYY')}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    paddingHorizontal: 40,
    flexDirection: 'row',
    position: 'absolute',
    top: 30,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  dateText: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})
