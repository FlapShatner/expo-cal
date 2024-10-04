import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { CalendarEvent } from '../../lib/events'
import { ColorOption } from '../../data/colorOptions'

export default function DetailSummary({ event, open, color }: { event: CalendarEvent; open: boolean; color: ColorOption }) {
 const bgColor = color.value
 return (
  <View style={[styles.summaryContainer, styles.textWrap]}>
   <Text
    ellipsizeMode='tail'
    numberOfLines={open ? 0 : 1}
    style={[{ color: bgColor }, styles.text]}>
    {event.title}
   </Text>
  </View>
 )
}

const styles = StyleSheet.create({
 summaryContainer: {
  flexGrow: 1,
  flexDirection: 'row',
  width: 275,
 },
 textWrap: {
  flexGrow: 0,
  flexShrink: 1,
  flexWrap: 'wrap',
 },
 text: {
  fontSize: 16,
  fontWeight: 'bold',
 },
})
