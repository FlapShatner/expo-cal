import { useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import * as Calendar from 'expo-calendar'

export type CalendarEvent = Calendar.Event
export type CalendarCalendar = Calendar.Calendar

export default function useCalendar({ eventId }: { eventId: string | null }) {
 // const [calendars, setCalendars] = useState<Calendar.Calendar[]>([])
 // const [calendarEvents, setCalendarEvents] = useState<Calendar.Event[]>([])
 // const [event, setEvent] = useState<Calendar.Event | null>(null)

 const eventsFetch = async () => {
  await Calendar.requestCalendarPermissionsAsync()
  const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT)
  const ids = calendars.map((c: any) => c.id)
  return Calendar.getEventsAsync([...ids], new Date('2024-05-01'), new Date('2024-12-31'))
 }

 const { data: calendarEvents, isLoading } = useQuery({
  queryKey: ['events'],
  queryFn: eventsFetch,
  refetchOnWindowFocus: false,
 })

 useEffect(() => {
  const getCalendars = async () => {
   const { status } = await Calendar.requestCalendarPermissionsAsync()
   if (status === 'granted') {
    const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT)
    const ids = calendars.map((c: any) => c.id)
    if (eventId) {
     const event = await Calendar.getEventAsync(eventId)
     setEvent(event)
    } else {
     const events = await Calendar.getEventsAsync([...ids], new Date('2024-05-01'), new Date('2024-12-31'))
     setCalendarEvents(events)
     setCalendars(calendars)
    }
   }
   if (status === 'denied') {
    console.log('The user has denied access to calendars.')
   }
  }
  getCalendars()
 }, [])

 return {
  event,
  calendarEvents,
  calendars,
 }
}
