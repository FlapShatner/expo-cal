import * as Calendar from 'expo-calendar'
import dayjs from './dayjs'

type EventFetch = {
 startDate?: string
 endDate?: string
} | null

export type CalendarEvent = Calendar.Event
export type CalendarCalendar = Calendar.Calendar

export const getCalendars = async () => {
 await Calendar.requestCalendarPermissionsAsync()
 const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT)
 return calendars
}

export const eventsFetch = async ({ startDate, endDate }) => {
 await Calendar.requestCalendarPermissionsAsync()
 const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT)
 const ids = calendars.map((c: any) => c.id)
 return Calendar.getEventsAsync([...ids], new Date(startDate), new Date(endDate))
}

export const dayEventsFetch = async (dates: EventFetch) => {
 if (!dates) {
  return
 }
 const { startDate, endDate } = dates
 await Calendar.requestCalendarPermissionsAsync()
 const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT)
 const ids = calendars.map((c: any) => c.id)
 return Calendar.getEventsAsync([...ids], startDate ? new Date(startDate) : new Date(), endDate ? new Date(endDate) : new Date())
}

export const singleEventFetch = async (eventId: string) => {
 await Calendar.requestCalendarPermissionsAsync()
 const event = await Calendar.getEventAsync(eventId)
 return event
}

export const deleteEvent = async (eventId: string) => {
 return await Calendar.deleteEventAsync(eventId)
}
