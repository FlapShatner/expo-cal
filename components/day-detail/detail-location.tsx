import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { ColorOption } from '../../data/colorOptions'
import { isJson } from '../../lib/utils'

export default function DetailLocation({ location, color }: { location: string; color: ColorOption }) {
 const loc = isJson(location) ? JSON.parse(location) : location

 const showPlaceName = () => {
  if (!loc.name) {
   return false
  }
  if (loc.address.includes(loc.name)) {
   return false
  }
  return true
 }
 return (
  <View style={styles.locationContainer}>
   <MaterialIcons
    color={color.value}
    name='location-pin'
    style={styles.icon}
   />
   <View style={styles.locationTextContainer}>
    {showPlaceName() && <Text style={[styles.locationName, { color: color.value }]}>{loc.name}</Text>}
    <Text style={[styles.locationAddress, { color: color.value }]}>{loc.address ?? loc}</Text>
   </View>
  </View>
 )
}

const styles = StyleSheet.create({
 locationContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginVertical: 4,
 },
 locationTextContainer: {
  flexDirection: 'column',
  width: '95%',
 },
 locationAddress: {
  fontSize: 14,
  flexShrink: 1,
 },
 locationName: {
  fontSize: 14,
  flexShrink: 1,
 },
 icon: {
  fontSize: 18,
  marginRight: 4,
 },
})
