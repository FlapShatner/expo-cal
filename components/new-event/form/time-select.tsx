import React, { useEffect } from 'react'
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useStore } from '../../../lib/store'
import { colors } from '../../../data/config'
import dayjs from '../../../lib/dayjs'

export default function TimeSelect() {
 const color = useStore((state) => state.color)
 const date = useStore((state) => state.dayDetails?.date)
 const setAllDay = useStore((state) => state.setAllDay)
 const setNewStartDate = useStore((state) => state.setNewStartDate)
 const setNewEndDate = useStore((state) => state.setNewEndDate)
 const newStartDate = useStore((state) => state.newStartDate)
 const newEndDate = useStore((state) => state.newEndDate)
 const allDay = useStore((state) => state.allDay)

 const showMode = (option: 'startTime' | 'endTime') => {
  if (option === 'startTime')
   DateTimePickerAndroid.open({
    mode: 'time',
    value: newStartDate ? newStartDate : new Date(),
    onChange: (event: DateTimePickerEvent, selectedDate?: Date) => {
     if (selectedDate) setNewStartDate(selectedDate)
    },
    is24Hour: false,
   })
  else if (option === 'endTime')
   DateTimePickerAndroid.open({
    mode: 'time',
    value: newEndDate ? newEndDate : new Date(),
    onChange: (event: DateTimePickerEvent, selectedDate?: Date) => {
     if (selectedDate) setNewEndDate(selectedDate)
    },
    is24Hour: false,
   })
 }
 return (
  <View style={styles.container}>
   <View style={styles.inputWrapper}>
    <Text style={styles.text}>Start Time</Text>
    <Pressable
     style={styles.dateContainer}
     onPress={() => showMode('startTime')}>
     <Text style={styles.text}>{newStartDate ? dayjs(newStartDate).format('hh:mm a') : dayjs(date).format('hh:mm a')}</Text>
    </Pressable>
   </View>
   <View style={styles.inputWrapper}>
    <Text style={styles.text}>End Time</Text>
    <Pressable
     style={styles.dateContainer}
     onPress={() => showMode('endTime')}>
     <Text style={styles.text}>{newEndDate ? dayjs(newEndDate).format('hh:mm a') : dayjs(date).format('hh:mm a')}</Text>
    </Pressable>
   </View>
   <View style={styles.checkboxContainer}>
    <BouncyCheckbox
     disableText
     size={32}
     fillColor={color.value}
     style={{ marginRight: 8 }}
     text='All day'
     isChecked={allDay}
     onPress={() => setAllDay(!allDay)}
    />
    <Text style={styles.text}>All day</Text>
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
  marginTop: 20,
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
 },
})
