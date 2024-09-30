import React from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { CalendarEvent } from '../../hooks/useCalendar'
import { ColorOption } from '../../data/colorOptions'
import DetailLocation from './detail-location'
export default function DetailInfo({ event, color }: { event: CalendarEvent; color: ColorOption }) {
  const hasNotes = !!event.notes
  const hasLocation = !!event.location
  console.log('event', event)
  return (
    <View style={styles.container}>
      {hasNotes &&
        <View style={[styles.descriptionContainer, { backgroundColor: color.ul }]}>
          <Text style={[styles.descriptionText, { color: color.value }]}>
            {event.notes}
          </Text>
        </View>}
      {hasLocation && <DetailLocation location={event.location} color={color} />}
      <View style={[styles.creatorContainer, { backgroundColor: color.ul }]}>
        <Text style={[styles.creatorText, { color: color.value }]}>
          Event creator: {event.organizerEmail}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: '100%'
  },
  descriptionContainer: {
    marginTop: 4,
    paddingHorizontal: 4,
    borderRadius: 4,
    width: '97%'
  },
  descriptionText: {
    flexGrow: 1,
    flexWrap: 'wrap',
    fontSize: 16
  },
  creatorContainer: {
    marginTop: 4,
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 4,
    borderRadius: 4,
    width: 275
  },
  creatorText: {
    flexShrink: 1,
    flexWrap: 'wrap',
    fontSize: 14
  }
})
