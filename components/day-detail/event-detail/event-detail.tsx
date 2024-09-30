import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native'
import { useStore } from '../../../lib/store'
import DeleteEvent from '../delete-event'
import DetailInfo from '../detail-info'
import DetailSummary from '../detail-summary'
import EditEvent from '../edit-event'
import useCalendar from '../../../hooks/useCalendar'

export default function EventDetail() {
  const setIsEventDetail = useStore(state => state.setIsEventDetail)
  const eventId = useStore(state => state.eventId)
  const color = useStore(state => state.color)
  const { event } = useCalendar({ eventId })
  if (!event) return null
  return (
    <View style={[styles.detailsContainer]}>
      <TouchableOpacity onPress={() => setIsEventDetail(false)}>
        <Text style={{ color: color.value }}>Back</Text>
      </TouchableOpacity>
      <View style={styles.actionContainer}>
        <EditEvent eventId={event.id} />
        <DeleteEvent eventId={event.id} />
      </View>
      <ScrollView style={styles.scrollView}>
        <DetailSummary event={event} open={true} color={color} />
        <DetailInfo event={event} color={color} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  detailsContainer: {
    flexGrow: 1,
    flexDirection: 'column',
    paddingLeft: 12
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 24
  },
  scrollView: {
    flex: 1,
    height: 200
  }
})
