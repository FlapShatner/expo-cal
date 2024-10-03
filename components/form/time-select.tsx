import React, { useState } from 'react'
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useStore } from '../../lib/store'
import { colors } from '../../data/config'
import dayjs from '../../lib/dayjs'

export default function TimeSelect() {
 const color = useStore((state) => state.color)
 const date = useStore((state) => state.dayDetails?.date)
 const setAllDay = useStore((state) => state.setAllDay)
 const setNewStartDate = useStore((state) => state.setNewStartDate)
 const setNewEndDate = useStore((state) => state.setNewEndDate)
 const newStartDate = useStore((state) => state.newStartDate)
 const newEndDate = useStore((state) => state.newEndDate)
 const allDay = useStore((state) => state.allDay)
 const timeZone = useStore((state) => state.timeZone)

 const handlePress = (mode: 'startTime' | 'endTime') => {
  setAllDay(false)
  showMode(mode)
 }

 const showMode = (option: 'startTime' | 'endTime') => {
  if (option === 'startTime')
   DateTimePickerAndroid.open({
    mode: 'time',
    timeZoneName: timeZone,
    value: newStartDate ? newStartDate : new Date(),
    onChange: (event: DateTimePickerEvent, selectedDate?: Date) => {
     if (selectedDate) setNewStartDate(selectedDate)
    },
    is24Hour: false,
   })
  else if (option === 'endTime')
   DateTimePickerAndroid.open({
    mode: 'time',
    timeZoneName: timeZone,
    value: newEndDate ? newEndDate : new Date(),
    onChange: (event: DateTimePickerEvent, selectedDate?: Date) => {
     if (selectedDate) setNewEndDate(selectedDate)
    },
    is24Hour: false,
   })
 }
 return (
  <View style={styles.container}>
   <View style={[styles.inputWrapper, { opacity: allDay ? 0.5 : 1 }]}>
    <Text style={styles.text}>Start Time</Text>
    <Pressable
     style={styles.dateContainer}
     onPress={() => handlePress('startTime')}>
     <Text style={styles.text}>{newStartDate ? dayjs(newStartDate).format('hh:mm a') : dayjs(date).format('hh:mm a')}</Text>
    </Pressable>
   </View>
   <View style={[styles.inputWrapper, { opacity: allDay ? 0.5 : 1 }]}>
    <Text style={styles.text}>End Time</Text>
    <Pressable
     style={styles.dateContainer}
     onPress={() => handlePress('endTime')}>
     <Text style={styles.text}>{newEndDate ? dayjs(newEndDate).format('hh:mm a') : dayjs(date).format('hh:mm a')}</Text>
    </Pressable>
   </View>
   <View style={styles.checkboxContainer}>
    <Text style={styles.text}>All day</Text>
    <BouncyCheckbox
     disableText
     size={34}
     fillColor={color.value}
     innerIconStyle={{ borderColor: allDay ? color.value : '#2e2e2e', borderWidth: 2 }}
     text='All day'
     isChecked={allDay}
     onPress={() => setAllDay(!allDay)}
    />
   </View>
  </View>
 )
}

const styles = StyleSheet.create({
 container: {
  width: '75%',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: 8,
 },
 text: {
  color: colors.textSec,
 },
 dateContainer: {
  flexGrow: 1,
  marginTop: 2,
  borderRadius: 8,
  paddingVertical: 8,
  paddingHorizontal: 12,
  backgroundColor: '#171717',
  borderWidth: 1,
  borderColor: colors.fg,
 },
 inputWrapper: {
  flexDirection: 'column',
  marginVertical: 6,
 },
 checkboxContainer: {
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 4,
 },
 timeDisabled: {
  opacity: 0.5,
 },
})
