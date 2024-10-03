import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { CalendarEvent } from '../../lib/events'
import EventText from './event-text'
import { ColorOption } from '../../data/colorOptions'
import dayjs from 'dayjs'
import DeleteEvent from './delete-event'
import EditEvent from '../edit-event/edit-event'
import DetailSummary from './detail-summary'
import DetailInfo from './detail-info'

export default function DetailEvent({ event, color }: { event: CalendarEvent; color: ColorOption }) {
 const [isEventDetail, setIsEventDetail] = useState(false)

 const { allDay, startDate, endDate } = event
 const startTime = dayjs(startDate).format('h:mm A')
 const endTime = dayjs(endDate).format('h:mm A')

 const handlePress = () => {
  setIsEventDetail(!isEventDetail)
  console.log('event', event)
 }

 return (
  <TouchableOpacity
   onPress={handlePress}
   style={[styles.container, { borderBottomColor: color.ul, borderBottomWidth: 1 }]}>
   <View style={styles.eventContainer}>
    <View style={styles.timeContainer}>
     {allDay ? (
      <EventText color={color}>All day</EventText>
     ) : (
      <View style={styles.timeTextContainer}>
       <EventText color={color}>{startTime} - </EventText>
       <EventText color={color}>{endTime}</EventText>
      </View>
     )}
    </View>
    <View style={[styles.detailsContainer, { borderLeftWidth: 1, borderLeftColor: color.value }]}>
     <DetailSummary
      event={event}
      open={isEventDetail}
      color={color}
     />
     {isEventDetail && (
      <DetailInfo
       event={event}
       color={color}
      />
     )}
    </View>
    {isEventDetail && (
     <View style={styles.buttonsContainer}>
      <EditEvent eventId={event.id} />
      <DeleteEvent eventId={event.id} />
     </View>
    )}
   </View>
  </TouchableOpacity>
 )
}
const styles = StyleSheet.create({
 container: {
  flexDirection: 'row',
  padding: 4,
  alignItems: 'center',
 },
 eventContainer: {
  position: 'relative',
  width: '92%',
  flexDirection: 'row',
 },
 timeContainer: {
  width: '25%',
  paddingLeft: 18,
 },
 timeTextContainer: {
  flexDirection: 'column',
 },

 detailsContainer: {
  flexDirection: 'column',
  width: '77%',
  paddingLeft: 12,
 },
 buttonsContainer: {
  flexGrow: 1,
  flexDirection: 'column',
  justifyContent: 'flex-start',
 },
})
