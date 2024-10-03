import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { getCalendars } from '../../../lib/events'
import { MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useStore } from '../../../lib/store'
import { colors } from '../../../data/config'
import * as Calendar from 'expo-calendar'

export default function ControlButtons() {
 const color = useStore((state) => state.color)
 const clearForm = useStore((state) => state.clearForm)
 const newStartDate = useStore((state) => state.newStartDate)
 const newEndDate = useStore((state) => state.newEndDate)
 const allDay = useStore((state) => state.allDay)
 const title = useStore((state) => state.title)
 const notes = useStore((state) => state.notes)
 const location = useStore((state) => state.location)
 const timeZone = useStore((state) => state.timeZone)

 const handleCancel = () => {
  clearForm()
  router.push('/')
 }

 const handleSubmit = async () => {
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
   endDate: newEndDate ? newEndDate : new Date(),
   endTimeZone: 'UTC',
   location: location ? location : '',
   notes: notes ? notes : '',
   recurrenceRule: undefined,
   startDate: newStartDate ? newStartDate : new Date(),
   status: undefined,
   timeZone: 'UTC',
   title: title ? title : '',
  }
  //   console.log('eventData', eventData)
  const result = await Calendar.createEventAsync(calId, eventData)
  console.log('result', result)
 }

 return (
  <View style={styles.submitButtonContainer}>
   <TouchableOpacity
    onPress={handleCancel}
    style={[styles.controlButton, { borderColor: colors.fg }]}>
    <MaterialIcons
     name='cancel'
     color={'#ebedf0'}
     size={18}
    />
    <Text style={styles.text}>Cancel</Text>
   </TouchableOpacity>
   <TouchableOpacity
    onPress={handleSubmit}
    style={[styles.controlButton, { backgroundColor: color.value }]}>
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
