import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { getCalendars } from '../../lib/events'
import { MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useStore } from '../../lib/store'
import { colors } from '../../data/config'
import dayjs from '../../lib/dayjs'
import * as Calendar from 'expo-calendar'

export default function ControlButtons({ setIsPending, isEdit }) {
 const color = useStore((state) => state.color)
 const clearForm = useStore((state) => state.clearForm)
 const newStartDate = useStore((state) => state.newStartDate)
 const newEndDate = useStore((state) => state.newEndDate)
 const eventId = useStore((state) => state.eventId)
 const allDay = useStore((state) => state.allDay)
 const title = useStore((state) => state.title)
 const notes = useStore((state) => state.notes)
 const location = useStore((state) => state.location)
 const timeZone = useStore((state) => state.timeZone)

 const handleCancel = () => {
  clearForm()
  router.push('/modal')
 }

 const submitForm = async ({ eventId, calId, eventData }) => {
  if (isEdit && eventId) {
   const result = await Calendar.updateEventAsync(eventId, eventData)
   setIsPending(false)
   router.push('/modal')
   return result
  }
  const result = await Calendar.createEventAsync(calId, eventData)
  setIsPending(false)
  router.push('/modal')
  return result
 }

 const handleSubmit = async () => {
  setIsPending(true)
  const calendars = await getCalendars()
  const primary = calendars.filter((c: any) => c.title.includes('@gmail.com'))
  let calId = primary[0].id
  if (!calId) {
   calId = calendars[0].id
  }
  const eventData = {
   alarms: [],
   allDay: allDay,
   availability: undefined,
   calendarId: calId,
   endDate: newEndDate ? dayjs(newEndDate).toDate() : new Date(),
   endTimeZone: timeZone ? timeZone : 'UTC',
   location: location ? location : '',
   notes: notes ? notes : '',
   recurrenceRule: undefined,
   startDate: newStartDate ? dayjs(newStartDate).toDate() : new Date(),
   status: undefined,
   timeZone: timeZone ? timeZone : 'UTC',
   title: title ? title : '',
  }

  const result = await submitForm({ eventId, calId, eventData })
  return result
 }

 const bgColor = color.value
 const fgColor = colors.fg

 return (
  <View style={styles.submitButtonContainer}>
   <TouchableOpacity
    onPress={handleCancel}
    style={[styles.controlButton, { borderColor: fgColor }]}>
    <MaterialIcons
     name='cancel'
     color={'#ebedf0'}
     size={18}
    />
    <Text style={styles.text}>Cancel</Text>
   </TouchableOpacity>
   <TouchableOpacity
    onPress={handleSubmit}
    style={[styles.controlButton, { backgroundColor: bgColor }]}>
    <MaterialIcons
     name='check'
     color={'#ebedf0'}
     size={18}
    />
    <Text style={styles.text}>Submit</Text>
   </TouchableOpacity>
  </View>
 )
}

const styles = StyleSheet.create({
 controlButton: {
  borderWidth: 2,
  width: '30%',
  flexShrink: 1,
  flexDirection: 'row',
  gap: 4,
  justifyContent: 'center',
  paddingHorizontal: 12,
  paddingVertical: 6,
  marginVertical: 6,
  marginHorizontal: 'auto',
  borderRadius: 8,
  backgroundColor: 'transparent',
 },
 text: {
  color: '#ebedf0',
  fontWeight: 'bold',
 },
 submitButtonContainer: {
  marginVertical: 20,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
 },
})
