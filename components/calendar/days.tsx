import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { eventsFetch } from '../../lib/events'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { days, Day as DayType } from '../../lib/date-utils'
import { useStore } from '../../lib/store'
import Day from './day/day'

export default function Days({ year, month }: { year: number; month: number }) {
 const setColor = useStore((state) => state.setColor)
 const color = useStore((state) => state.color)

 const { data: calendarEvents, isLoading } = useQuery({
  queryKey: ['events'],
  queryFn: eventsFetch,
  refetchOnWindowFocus: false,
 })

 const getUserColor = async () => {
  try {
   const color = await AsyncStorage.getItem('selectedColor')
   if (color) {
    setColor(JSON.parse(color))
   }
  } catch (error) {
   console.log(error)
  }
 }

 useEffect(() => {
  getUserColor()
 }, [])

 const daysArray = days(year, month, 32)

 return (
  <View style={styles.grid}>
   {daysArray.map((day: DayType) => (
    <View
     key={day.date}
     style={styles.gridItem}>
     <Day
      calendarData={calendarEvents ?? []}
      color={color}
      day={day}
     />
    </View>
   ))}
  </View>
 )
}

const styles = StyleSheet.create({
 grid: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginHorizontal: 'auto',
 },
 gridItem: {
  width: '25%',
  marginBottom: 8,
 },
 text: {
  fontSize: 20,
  fontWeight: 'semibold',
  marginBottom: 20,
 },
})
