import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { useStore } from '../../../lib/store'
import { colors } from '../../../data/config'
import { MaterialIcons } from '@expo/vector-icons'
import Location from './location'
import FormButton from './form-button'
import CancelInput from './cancel-input'
import DateSelect from './date-select'
import TimeSelect from './time-select'

function NewEventForm() {
 const setIsNewEvent = useStore((state) => state.setIsNewEvent)
 const [showDescription, setShowDescription] = useState(false)
 const [showLocation, setShowLocation] = useState(false)
 const [title, setTitle] = useState('')
 const [notes, setNotes] = useState('')

 const handlePress = () => {
  setIsNewEvent(false)
 }

 const handleCancel = (inputId: string) => {
  console.log('cancel', inputId)
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
    style={styles.titleInput}
    placeholder='Create Title'
    placeholderTextColor={colors.textSec}
    onChangeText={handleTitleChange}
   />
   <DateSelect />
   <TimeSelect />
   {showDescription ? (
    <View style={styles.inputWrapper}>
     <TextInput
      style={[styles.notesInput, { color: colors.textSec }]}
      placeholder={`Description`}
      placeholderTextColor={colors.textSec}
      onChangeText={handleNotesChange}
     />
     <CancelInput onPress={() => handleCancel('notes')} />
    </View>
   ) : (
    <FormButton
     text='Add description (optional)'
     onPress={() => setShowDescription(true)}
    />
   )}
   {showLocation ? (
    <View style={styles.locationWrapper}>
     <Location />
     <CancelInput onPress={() => handleCancel('location')} />
    </View>
   ) : (
    <FormButton
     text='Add location (optional)'
     onPress={() => setShowLocation(true)}
    />
   )}
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
  flexGrow: 1,
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
 inputWrapper: {
  flexDirection: 'row',
  alignItems: 'center',
 },
 locationWrapper: {
  flexDirection: 'row',
  alignItems: 'center',
 },
})

export default NewEventForm
