import React, { useEffect, useState } from 'react'
import { ScrollView, Text, StyleSheet, View, Platform, Button } from 'react-native'
import * as Calendar from 'expo-calendar'

export default function Events() {
 const [events, setEvents] = useState<any>([])
 useEffect(() => {
  const getCalendars = async () => {
   const { status } = await Calendar.requestCalendarPermissionsAsync()
   if (status === 'granted') {
    const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT)
    const ids = calendars.map((c: any) => c.id)
    const events = await Calendar.getEventsAsync([...ids], new Date('2024-05-01'), new Date('2024-12-31'))
    console.log(events)
    setEvents(events)
   }
   if (status === 'denied') {
    console.log('The user has denied access to calendars.')
   }
  }
  getCalendars()
 }, [])

 return (
  <ScrollView>
   <Text>Events</Text>
   {events && events.map((e: any) => <Text key={e.id}>{e.title} </Text>)}
  </ScrollView>
 )
}
