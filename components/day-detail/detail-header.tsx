import dayjs from 'dayjs'
import React from 'react'
import { StyleSheet, Text, Pressable } from 'react-native'
import { usePathname } from 'expo-router'
import { ColorOption } from '../../data/colorOptions'

export default function DetailHeader({ color, date }: { color: ColorOption; date: string }) {
 const dayLabel = dayjs(date).format('dddd')
 const textColor = color.text
 const path = usePathname()

 return (
  <Pressable style={styles.header}>
   {path === '/modal/new' ? (
    <Text style={[styles.text, { color: textColor }]}>New Event</Text>
   ) : (
    <>
     <Text style={[styles.headerText, { color: textColor }]}>{dayLabel}</Text>
     <Text style={[styles.dateText, { color: textColor }]}>{dayjs(date).format('MMMM D, YYYY')}</Text>
    </>
   )}
  </Pressable>
 )
}

const styles = StyleSheet.create({
 header: {
  width: '100%',
  paddingHorizontal: 40,
  flexDirection: 'row',
  position: 'absolute',
  top: 30,
  justifyContent: 'space-between',
  alignItems: 'center',
 },
 headerText: {
  fontSize: 24,
  fontWeight: 'bold',
 },
 dateText: {
  fontSize: 20,
  fontWeight: 'bold',
 },
 text: {
  textAlign: 'center',
  fontSize: 20,
  fontWeight: 'bold',
 },
})
