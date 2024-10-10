import React from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import RenderHtml, { useContentWidth } from 'react-native-render-html'
import { CalendarEvent } from '../../lib/events'
import { ColorOption } from '../../data/colorOptions'
import DetailLocation from './detail-location'
export default function DetailInfo({ event, color }: { event: CalendarEvent; color: ColorOption }) {
 const hideEmail = event.organizerEmail?.startsWith('en.usa')
 const hasNotes = !!event.notes
 const hasLocation = !!event.location
 const notesHtml = { html: event.notes }
 const bgColor = color.value
 const ulColor = color.ul
 return (
  <View style={styles.container}>
   {hasNotes && (
    <View style={[styles.descriptionContainer, { backgroundColor: ulColor }]}>
     <RenderHtml
      baseStyle={{ color: bgColor }}
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
    <View style={[styles.creatorContainer, { backgroundColor: ulColor }]}>
     <Text style={[styles.creatorText, { color: bgColor }]}>Event creator: </Text>
     <Text style={[styles.creatorText, { color: bgColor }]}>{event.organizerEmail}</Text>
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
  flexDirection: 'column',
  paddingVertical: 3,
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
