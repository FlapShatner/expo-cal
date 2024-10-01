import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { useStore } from '../../lib/store'
import { colors } from '../../data/config'
import { MaterialIcons } from '@expo/vector-icons'

function NewEventForm() {
 const setIsNewEvent = useStore((state) => state.setIsNewEvent)
 const [title, setTitle] = useState('')
 const [notes, setNotes] = useState('')

 const handlePress = () => {
  setIsNewEvent(false)
 }

 const handleTitleChange = (text: string) => {
  setTitle(text)
 }

 const handleNotesChange = (text: string) => {
  setNotes(text)
 }

 return (
  <View style={styles.container}>
   <TextInput
    style={styles.titleInput}
    placeholder='Title'
    onChangeText={handleTitleChange}
   />
   <TextInput
    style={styles.notesInput}
    placeholder='Notes'
    onChangeText={handleNotesChange}
   />
   <TouchableOpacity
    onPress={handlePress}
    style={styles.submitButton}>
    <MaterialIcons
     name='check'
     color={'#ebedf0'}
     size={18}
    />
    <Text style={styles.text}>Submit</Text>
   </TouchableOpacity>
  </View>
 )
}

const styles = StyleSheet.create({
 container: {
  position: 'absolute',
  flexDirection: 'column',
  width: '100%',
  paddingHorizontal: 12,
  backgroundColor: '#000000',
  height: 300,
 },
 titleInput: {
  marginVertical: 4,
  borderRadius: 8,
  paddingVertical: 4,
  paddingHorizontal: 8,
  borderBottomWidth: 1,
  borderColor: colors.fg,
  color: 'white',
 },
 notesInput: {
  marginVertical: 4,
  borderRadius: 8,
  paddingVertical: 4,
  paddingHorizontal: 8,
  backgroundColor: '#171717',
  borderWidth: 1,
  borderColor: colors.fg,
 },
 submitButton: {
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

export default NewEventForm
