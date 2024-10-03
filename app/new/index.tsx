import React from 'react'
import { useStore } from '../../lib/store'
import NewEventForm from '../../components/new-event/form/new-event-form'
import { View, StyleSheet, Text } from 'react-native'

export default function Page() {
 const color = useStore((state) => state.color)
 return (
  <View style={[styles.container, { backgroundColor: color.value }]}>
   <View style={styles.textContainer}>
    <Text style={[styles.text, { color: color.text }]}>New Event</Text>
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
