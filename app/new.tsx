import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router'
import { useStore } from '../lib/store'
import NewEventForm from '../components/new-event/new-event-form'
import { View, StyleSheet, Text } from 'react-native'

export default function New() {
 const color = useStore((state) => state.color)
 const nav = useNavigation()
 useEffect(() => {
  nav.setOptions({
   headerShown: false,
  })
 }, [])

 const bgColor = color.value
 const textColor = color.text

 return (
  <View style={[styles.container, { backgroundColor: bgColor }]}>
   <View style={styles.textContainer}>
    <Text style={[styles.text, { color: textColor }]}>New Event</Text>
   </View>
   <NewEventForm />
  </View>
 )
}

const styles = StyleSheet.create({
 container: {
  position: 'relative',
  marginTop: '50%',
  borderRadius: 50,
  width: '98%',
  marginHorizontal: 6,
  height: 480,
 },
 textContainer: {
  paddingVertical: 20,
 },
 text: {
  textAlign: 'center',
  fontSize: 20,
  fontWeight: 'bold',
 },
})
