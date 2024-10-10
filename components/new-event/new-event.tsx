import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useStore } from '../../lib/store'
import { router } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'

function NewEvent() {
 const color = useStore((state) => state.color)
 const setLocation = useStore((state) => state.setLocation)
 const setNotes = useStore((state) => state.setNotes)

 const handlePress = () => {
  setLocation('')
  setNotes('')
  router.push('/modal/new')
 }

 const bgColor = color.value
 const textColor = color.text

 return (
  <TouchableOpacity
   style={[styles.newButton, { backgroundColor: bgColor }]}
   onPress={handlePress}>
   <MaterialIcons
    name='add'
    color={textColor}
    size={18}
   />
   <Text style={[styles.text, { color: textColor }]}>New Event</Text>
  </TouchableOpacity>
 )
}

const styles = StyleSheet.create({
 newButton: {
  marginVertical: 6,
  marginHorizontal: 'auto',
  width: '50%',
  flexDirection: 'row',
  justifyContent: 'center',
  paddingHorizontal: 12,
  paddingVertical: 4,
  borderRadius: 8,
 },
 text: {
  color: '#ebedf0',
  fontWeight: 'bold',
 },
})

export default NewEvent
