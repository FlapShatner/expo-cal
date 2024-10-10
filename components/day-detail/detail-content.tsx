import React from 'react'
import { View, StyleSheet, ScrollView, Pressable } from 'react-native'
import { ColorOption } from '../../data/colorOptions'
import { CalendarEvent, dayEventsFetch } from '../../lib/events'
import NewEvent from '../new-event/new-event'
import DetailEvent from './detail-event'
import dayjs from '../../lib/dayjs'
import { useStore } from '../../lib/store'
import { filterEvents } from '../../lib/date-utils'
import { useQuery } from '@tanstack/react-query'
export default function DetailContent() {
 const date = useStore((state) => state.dayDetails?.date)
 const color = useStore((state) => state.color)
 const timeZone = useStore((state) => state.timeZone)
 const fetchEvents = async ({ queryKey }) => {
  const [date] = queryKey
  const startDate = dayjs(date).tz(timeZone).startOf('day').subtract(1, 'day').toString()
  const endDate = dayjs(date).tz(timeZone).endOf('day').add(1, 'day').toString()
  const events = await dayEventsFetch({ startDate, endDate })
  if (!events) return
  const filtered = filterEvents(events, date)
  return filtered
 }

 const { data: todayEvents, isLoading } = useQuery({
  queryKey: [date],
  queryFn: fetchEvents,
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
