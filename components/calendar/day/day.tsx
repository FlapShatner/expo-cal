import React from 'react'
import Weekday from './weekday'
import MonthDay from './month-day'
import Event from './event'
import { View, Image, StyleSheet, ScrollView } from 'react-native'
import { Day as DayType, trunc } from '../../../lib/date-utils'
import { ColorOption } from '../../../data/colorOptions'
import dayjs from '../../../lib/dayjs'
import { CalendarCalendar, CalendarEvent } from '../../../hooks/useCalendar'

function Day({
  color,
  day,
  calendarData
}: {
  color: ColorOption
  day: DayType
  calendarData: { calendarEvents: CalendarEvent[]; calendars: CalendarCalendar[] }
}) {
  const dayLabel = trunc(dayjs(day.date).format('dddd'))
  const calEvents = calendarData.calendarEvents
  const eventsForDay = calEvents?.filter((event) => dayjs(event.startDate).format('YYYY-MM-DD') === dayjs(day.date).format('YYYY-MM-DD'))
//   console.log(eventsForDay)
  return (
    <View style={styles.dayContainer}>
      <Image source={require('../../../assets/cal_assets/bg_lg_e.png')} style={styles.bg} />
      <View style={styles.inner} />
      <View style={styles.header}>
        <Weekday weekday={dayLabel} color={color} />
        <MonthDay day={day.day} color={color} />
      </View>
      <ScrollView>
      {eventsForDay?.map((event) => (
        <Event key={event.id} event={event} color={color} />
      ))}
      </ScrollView>
      <View style={[styles.footer, { backgroundColor: color.value }]} />
    </View>
  )
}

const styles = StyleSheet.create({
  dayContainer: {
    marginTop: 4,
    position: 'relative',
    width: 100,
    height: 100
  },
  bg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 100,
    height: 100
  },
  inner: {
    position: 'absolute',
    backgroundColor: '#0e0e0e',
    borderRadius: 14,
    top: 4,
    left: 4,
    width: 92,
    height: 92
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  dayText: {
    fontSize: 16,
    fontWeight: 'semibold'
  },
  footer: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    width: 92,
    borderBottomStartRadius: 13,
    borderBottomEndRadius: 13,
    height: 16
  }
})

export default Day
