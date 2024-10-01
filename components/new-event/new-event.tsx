import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useStore } from '../../lib/store'
import { MaterialIcons } from '@expo/vector-icons'

function NewEvent() {
 const color = useStore((state) => state.color)
 const setIsNewEvent = useStore((state) => state.setIsNewEvent)

 const handlePress = () => {
  setIsNewEvent(true)
 }

 return (
  <TouchableOpacity
   onPress={handlePress}
   style={[styles.editButton, { backgroundColor: color.value }]}>
   <MaterialIcons
    name='add'
    color={'#ebedf0'}
    size={18}
   />
   <Text style={styles.text}>New Event</Text>
  </TouchableOpacity>
 )
}

const styles = StyleSheet.create({
 editButton: {
  width: '50%',
  flexShrink: 1,
  flexDirection: 'row',
  justifyContent: 'center',
  paddingHorizontal: 12,
  paddingVertical: 4,
  marginVertical: 6,
  marginHorizontal: 'auto',
  borderRadius: 8,
  backgroundColor: 'transparent',
 },
 text: {
  color: '#ebedf0',
  fontWeight: 'bold',
 },
})

export default NewEvent
