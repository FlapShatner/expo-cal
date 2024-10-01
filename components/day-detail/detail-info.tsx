import React from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import RenderHtml, { useContentWidth } from 'react-native-render-html'
import { CalendarEvent } from '../../hooks/useCalendar'
import { ColorOption } from '../../data/colorOptions'
import DetailLocation from './detail-location'
export default function DetailInfo({ event, color }: { event: CalendarEvent; color: ColorOption }) {
 const hideEmail = event.organizerEmail?.startsWith('en.usa')
 const hasNotes = !!event.notes
 const hasLocation = !!event.location
 const notesHtml = { html: event.notes }
 return (
  <View style={styles.container}>
   {hasNotes && (
    <View style={[styles.descriptionContainer, { backgroundColor: color.ul }]}>
     <RenderHtml
      baseStyle={{ color: color.value }}
      contentWidth={275}
      source={notesHtml}
     />
    </View>
   )}
   {hasLocation && (
    <DetailLocation
     location={event.location}
     color={color}
    />
   )}
   {!hideEmail && (
    <View style={[styles.creatorContainer, { backgroundColor: color.ul }]}>
     <Text style={[styles.creatorText, { color: color.value }]}>Event creator: {event.organizerEmail}</Text>
    </View>
   )}
  </View>
 )
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  flexDirection: 'column',
  width: '100%',
 },
 descriptionContainer: {
  marginTop: 4,
  paddingHorizontal: 4,
  borderRadius: 4,
  width: '95%',
 },
 descriptionText: {
  flexGrow: 1,
  flexWrap: 'wrap',
  fontSize: 16,
 },
 creatorContainer: {
  marginTop: 4,
  flex: 1,
  flexDirection: 'row',
  paddingHorizontal: 4,
  borderRadius: 4,
  width: '95%',
 },
 creatorText: {
  flexShrink: 1,
  flexWrap: 'wrap',
  fontSize: 14,
 },
})
