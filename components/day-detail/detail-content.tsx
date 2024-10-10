import React, { useEffect } from 'react'
import { View, StyleSheet, ScrollView, Pressable } from 'react-native'
import { ColorOption } from '../../data/colorOptions'
import { CalendarEvent, dayEventsFetch, eventsFetch } from '../../lib/events'
import NewEvent from '../new-event/new-event'
import DetailEvent from './detail-event'
import dayjs from '../../lib/dayjs'
import { useStore } from '../../lib/store'
import { filterEvents, splitMultiDayEvents } from '../../lib/date-utils'
import { useQuery } from '@tanstack/react-query'

export default function DetailContent() {
 const date = useStore((state) => state.dayDetails?.date)
 const color = useStore((state) => state.color)
 const year = useStore((state) => state.year)
 const month = useStore((state) => state.month)

 const fetchEvents = async ({ queryKey }) => {
  const [date, year, month] = queryKey
  const m = Number(month)
  const y = Number(year)
  const startDate = dayjs()
   .month(m - 1)
   .year(y)
   .startOf('month')
   .toDate()
  const endDate = dayjs()
   .month(m - 1)
   .year(y)
   .endOf('month')
   .add(2, 'day')
   .toDate()
  const events = await eventsFetch({ startDate, endDate })
  const splitEvents = splitMultiDayEvents(events)
  const filtered = filterEvents(splitEvents, date)
  return filtered
 }

 const { data: todayEvents, isLoading } = useQuery({
  queryKey: [date, year, month],
  queryFn: () => fetchEvents({ queryKey: [date, year, month] }),
  refetchOnWindowFocus: false,
 })
 return (
  <Pressable style={styles.container}>
   <ScrollView contentContainerStyle={styles.scrollContent}>
    <NewEvent />
    {todayEvents?.map((event) => (
     <DetailEvent
      color={color}
      key={event.id}
      event={event}
     />
    ))}
   </ScrollView>
  </Pressable>
 )
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  position: 'absolute',
  width: '98%',
  height: 260,
  backgroundColor: '#0e0e0e',
 },
 scrollContent: {
  position: 'relative',
 },
})
