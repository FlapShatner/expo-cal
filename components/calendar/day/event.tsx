import React from 'react'
import { CalendarEvent } from '../../../lib/events'
import { View, Text, StyleSheet } from 'react-native'
import { ColorOption } from '../../../data/colorOptions'
import { trunc } from '../../../lib/date-utils'
import dayjs from '../../../lib/dayjs'

export default function Event({ event, color }: { event: CalendarEvent; color: ColorOption }) {
 const time = (datetime: string | undefined) => {
  if (event.allDay) {
   return 'All Day'
  }
  return dayjs(datetime).format('h:mm a')
 }

 const colorValue = color.value
 return (
  <View style={styles(colorValue).eventContainer}>
   <Text style={styles(colorValue).eventTime}>{time(event.startDate.toString())}</Text>
   <Text style={styles(colorValue).event}>- {trunc(event.title, 10, true)}</Text>
  </View>
 )
}

const styles = (color: string) =>
 StyleSheet.create({
  event: {
   color: color,
   fontSize: 9,
   fontWeight: 'bold',
  },
  eventTime: {
   color: color,
   fontSize: 8,
   fontWeight: 'bold',
   marginRight: 1,
  },
  eventContainer: {
   marginLeft: 8,
   display: 'flex',
   flexDirection: 'row',
  },
 })
