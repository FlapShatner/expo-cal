import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { ColorOption } from '../../data/colorOptions'
import { CalendarEvent } from '../../hooks/useCalendar'
import { useStore } from '../../lib/store'
import DetailEvent from './detail-event'
import EventDetail from './event-detail/event-detail'
export default function DetailContent({ color, events }: { color: ColorOption; events: CalendarEvent[] | null }) {
  const isEventDetail = useStore(state => state.isEventDetail)
  return (
    <View style={styles.container}>
      {isEventDetail ? <EventDetail /> : 
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {events?.map((event) => (
            <DetailEvent color={color} key={event.id} event={event} />
          ))}
        </ScrollView>
      }
      </View>
  
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    width: '98%',
    height: 300,
    backgroundColor: '#0e0e0e'
  },
  scrollContent: {
    position: 'relative',
  },
})
