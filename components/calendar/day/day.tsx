import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { router } from 'expo-router'
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { ColorOption } from '../../../data/colorOptions'
import { CalendarCalendar, CalendarEvent } from '../../../lib/events'
import { Day as DayType, trunc } from '../../../lib/date-utils'
import dayjs from '../../../lib/dayjs'
import { useStore } from '../../../lib/store'
import { getWeather } from '../../../lib/weather'
import Event from './event'
import MonthDay from './month-day'
import Weather from './weather'
import Weekday from './weekday'

function Day({ color, day, calendarData }: { color: ColorOption; day: DayType; calendarData: CalendarEvent[] }) {
 const setDetailVisible = useStore((state) => state.setDetailVisible)
 const setDayDetails = useStore((state) => state.setDayDetails)
 const detailVisible = useStore((state) => state.detailVisible)
 const year = Number(dayjs().format('YYYY'))
 const month = Number(dayjs().format('M'))
 const weatherFetch = async () => {
  return getWeather(65804, month - 1, year)
 }

 const weatherQuery = useQuery({
  queryKey: ['weather'],
  queryFn: weatherFetch,
  refetchOnWindowFocus: false,
 })

 const formatDate = (event: CalendarEvent) => {
  if (event.timeZone !== 'UTC') {
   return dayjs(event.startDate).format('YYYY-MM-DD')
  }
  return dayjs(event.startDate).utc().format('YYYY-MM-DD')
 }

 const weatherArray = weatherQuery.data?.filter((weather) => weather.date === day.date)
 const todayWeather = weatherArray && weatherArray?.length > 0 ? weatherArray[0] : null
 const dayLabel = trunc(dayjs(day.date).format('dddd'))
 const calEvents = calendarData
 const eventsForDay = calEvents?.filter((event) => {
  return formatDate(event) === dayjs(day.date).utc().format('YYYY-MM-DD')
 })

 const hasEvents = eventsForDay?.length > 0
 const handlePress = () => {
  //   setDetailVisible(true)
  router.push('modal')
  setDayDetails({ date: day.date, weather: todayWeather, events: eventsForDay })
 }
 return (
  <Pressable
   style={styles.dayContainer}
   onPress={handlePress}>
   <Image
    source={require('../../../assets/cal_assets/bg_lg_e.png')}
    style={styles.bg}
   />
   <View style={styles.inner} />
   <View style={styles.header}>
    <Weekday
     weekday={dayLabel}
     color={color}
    />
    <MonthDay
     day={day.day}
     color={color}
    />
   </View>
   {hasEvents &&
    eventsForDay?.map((event) => (
     <Event
      key={event.id}
      event={event}
      color={color}
     />
    ))}
   <Weather
    weather={todayWeather}
    color={color}
   />
  </Pressable>
 )
}

const styles = StyleSheet.create({
 dayContainer: {
  marginTop: 4,
  position: 'relative',
  width: 100,
  height: 100,
 },
 bg: {
  position: 'absolute',
  top: 0,
  left: 0,
  width: 100,
  height: 100,
 },
 inner: {
  position: 'absolute',
  backgroundColor: '#0e0e0e',
  borderRadius: 14,
  top: 4,
  left: 4,
  width: 92,
  height: 92,
 },
 header: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
 },
})

export default Day
