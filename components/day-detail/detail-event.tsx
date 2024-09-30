import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { CalendarEvent } from '../../hooks/useCalendar'
import { useStore } from '../../lib/store'
import EventText from './event-text'
import { ColorOption } from '../../data/colorOptions'
import dayjs from 'dayjs'
import DeleteEvent from './delete-event'
import EditEvent from './edit-event'
import DetailSummary from './detail-summary'
import DetailInfo from './detail-info'

export default function DetailEvent({ event, color }: { event: CalendarEvent; color: ColorOption }) {
  const setEventId = useStore(state => state.setEventId)
  const setIsEventDetail = useStore(state => state.setIsEventDetail)
  const isEventDetail = useStore(state => state.isEventDetail)
  const { allDay, startDate, endDate } = event
  const startTime = dayjs(startDate).format('h:mm A')
  const endTime = dayjs(endDate).format('h:mm A')

  const handlePress = () => {
    setEventId(event.id)
    setIsEventDetail(!isEventDetail)
  }

  return (
    <TouchableOpacity onPress={handlePress} style={[styles.container, { borderBottomColor: color.ul, borderBottomWidth: 1 }]}>
      <View style={styles.eventContainer}>
        <View style={styles.timeContainer}>
          {allDay
            ? <EventText color={color}>All day</EventText>
            : <View style={styles.timeTextContainer}>
                <EventText color={color}>
                  {startTime} -{' '}
                </EventText>
                <EventText color={color}>
                  {endTime}
                </EventText>
              </View>}
        </View>
        <View style={[styles.detailsContainer, { borderLeftWidth: 1, borderLeftColor: color.value }]}>
          <DetailSummary event={event} open={isEventDetail} color={color} />
        </View>
      </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 4,
    alignItems: 'center'
  },
  eventContainer: {
    flex: 1,
    flexDirection: 'row',
    width: 100
  },
  timeContainer: {
    width: '25%',
    paddingLeft: 18
  },
  timeTextContainer: {
    flexDirection: 'column'
  },

  descriptionContainer: {
    padding: 4,
    borderRadius: 8,
    marginBottom: 4
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4
  },
  icon: {
    width: 16,
    height: 16
  },
  locationTextContainer: {
    marginLeft: 8
  },
  locationName: {
    fontSize: 12
  },
  locationAddress: {
    fontSize: 12
  },
  creatorContainer: {
    padding: 4,
    borderRadius: 8,
    marginTop: 4
  },
  creatorText: {
    fontSize: 12
  },
  detailsContainer: {
    flexDirection: 'column',
    paddingLeft: 12
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
    borderRadius: 8,
    marginTop: 4,
    alignSelf: 'center'
  },
  toggleText: {
    fontSize: 10,
    marginRight: 4
  },
  toggleIcon: {
    width: 16,
    height: 16
  }
})
