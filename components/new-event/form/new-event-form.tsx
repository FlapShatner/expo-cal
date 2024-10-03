import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { useStore } from '../../../lib/store'
import { colors } from '../../../data/config'
import Description from './description'
import Location from './location'
import FormButton from './form-button'
import DateSelect from './date-select'
import TimeSelect from './time-select'
import ControlButtons from './control-buttons'

function NewEventForm() {
 const [showDescription, setShowDescription] = useState(false)
 const [showLocation, setShowLocation] = useState(false)
 const title = useStore((state) => state.title)
 const notes = useStore((state) => state.notes)
 const setTitle = useStore((state) => state.setTitle)
 const setNotes = useStore((state) => state.setNotes)

 const handleCancel = (inputId: string) => {
  //   console.log('cancel', inputId)
  if (inputId === 'notes') {
   setShowDescription(false)
   setNotes('')
  }
  if (inputId === 'location') {
   setShowLocation(false)
  }
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
    value={title}
    placeholder='Enter event title'
    placeholderTextColor={colors.textSec}
    style={styles.titleInput}
    onChangeText={handleTitleChange}
   />
   <DateSelect />
   <TimeSelect />
   {showDescription ? (
    <Description
     notes={notes}
     handleNotesChange={handleNotesChange}
     handleCancel={handleCancel}
    />
   ) : (
    <FormButton
     text='Add description (optional)'
     onPress={() => setShowDescription(true)}
    />
   )}
   {showLocation ? (
    <Location handleCancel={handleCancel} />
   ) : (
    <FormButton
     text='Add location (optional)'
     onPress={() => setShowLocation(true)}
    />
   )}
   <ControlButtons />
  </View>
 )
}

const styles = StyleSheet.create({
 container: {
  paddingHorizontal: 12,
  backgroundColor: '#000000',
  height: 340,
 },
 titleInput: {
  fontSize: 24,
  marginVertical: 8,
  borderRadius: 8,
  paddingVertical: 4,
  paddingHorizontal: 8,
  borderBottomWidth: 1,
  borderColor: colors.fg,
  color: 'white',
 },
})

export default NewEventForm
