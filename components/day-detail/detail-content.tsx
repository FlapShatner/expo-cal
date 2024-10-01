import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { ColorOption } from '../../data/colorOptions'
import { CalendarEvent } from '../../hooks/useCalendar'
import DetailEvent from './detail-event'
export default function DetailContent({ color, events }: { color: ColorOption; events: CalendarEvent[] | null }) {
 return (
  <View style={styles.container}>
   <ScrollView contentContainerStyle={styles.scrollContent}>
    {events?.map((event) => (
     <DetailEvent
      color={color}
      key={event.id}
      event={event}
     />
    ))}
   </ScrollView>
  </View>
 )
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  position: 'absolute',
  width: '98%',
  height: 300,
  backgroundColor: '#0e0e0e',
 },
 scrollContent: {
  position: 'relative',
 },
})
