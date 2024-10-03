import React, { useEffect } from 'react'
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useStore } from '../../lib/store'
import { colors } from '../../data/config'
import dayjs from '../../lib/dayjs'

export default function DateSelect() {
 const date = useStore((state) => state.dayDetails?.date)
 const weather = useStore((state) => state.dayDetails?.weather)
 const setNewStartDate = useStore((state) => state.setNewStartDate)
 const setNewEndDate = useStore((state) => state.setNewEndDate)
 const newStartDate = useStore((state) => state.newStartDate)
 const newEndDate = useStore((state) => state.newEndDate)
 const timeZone = useStore((state) => state.timeZone)
 useEffect(() => {
  if (!date) return
  setNewStartDate(dayjs(date).tz(timeZone).toDate())
  setNewEndDate(dayjs(date).tz(timeZone).toDate())
 }, [])

 const showMode = (option: 'startDate' | 'endDate') => {
  if (option === 'startDate')
   DateTimePickerAndroid.open({
    mode: 'date',
    timeZoneName: timeZone,
    value: newStartDate ? newStartDate : new Date(),
    onChange: (event: DateTimePickerEvent, selectedDate?: Date) => {
     if (selectedDate) setNewStartDate(selectedDate)
    },
    is24Hour: true,
   })
  else if (option === 'endDate')
   DateTimePickerAndroid.open({
    mode: 'date',
    timeZoneName: timeZone,
    value: newEndDate ? newEndDate : new Date(),
    onChange: (event: DateTimePickerEvent, selectedDate?: Date) => {
     if (selectedDate) setNewEndDate(selectedDate)
    },
    is24Hour: true,
   })
 }

 return (
  <View style={styles.container}>
   <Pressable
    style={styles.dateContainer}
    onPress={() => showMode('startDate')}>
    <Text style={styles.text}>{newStartDate ? dayjs(newStartDate).format('MMMM D, YYYY') : dayjs(date).format('MMMM D, YYYY')}</Text>
   </Pressable>
   <Text style={styles.text}> to </Text>
   <Pressable
    style={styles.dateContainer}
    onPress={() => showMode('endDate')}>
    <Text style={styles.text}>{newEndDate ? dayjs(newEndDate).format('MMMM D, YYYY') : dayjs(date).format('MMMM D, YYYY')}</Text>
   </Pressable>
  </View>
 )
}

const styles = StyleSheet.create({
 container: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 8,
 },
 text: {
  color: colors.textSec,
 },
 dateContainer: {
  flexGrow: 1,
  marginVertical: 4,
  borderRadius: 8,
  paddingVertical: 8,
  paddingHorizontal: 8,
  backgroundColor: '#171717',
  borderWidth: 1,
  borderColor: colors.fg,
 },
})
