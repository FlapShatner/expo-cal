import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, TextInput, Pressable } from 'react-native'
import { useStore } from '../../lib/store'
import { colors } from '../../data/config'
import Description from '../form/description'
import Location from '../form/location'
import FormButton from '../form/form-button'
import Loading from '../form/loading'
import DateSelect from '../form/date-select'
import TimeSelect from '../form/time-select'
import ControlButtons from '../form/control-buttons'

function NewEventForm() {
 const [showDescription, setShowDescription] = useState(false)
 const [showLocation, setShowLocation] = useState(false)
 const [isPending, setIsPending] = useState(false)
 const title = useStore((state) => state.title)
 const notes = useStore((state) => state.notes)
 const setTitle = useStore((state) => state.setTitle)
 const setNotes = useStore((state) => state.setNotes)
 const clearForm = useStore((state) => state.clearForm)
 const setEventId = useStore((state) => state.setEventId)
 const setIsError = useStore((state) => state.setIsError)
 const isError = useStore((state) => state.isError)

 useEffect(() => {
  setEventId('')
  clearForm()
 }, [])

 const handleCancel = (inputId: string) => {
  if (inputId === 'notes') {
   setShowDescription(false)
   setNotes('')
  }
  if (inputId === 'location') {
   setShowLocation(false)
  }
 }

 const handleTitleChange = (text: string) => {
  setIsError({ status: false, message: '' })
  setTitle(text)
 }

 const handleNotesChange = (text: string) => {
  setNotes(text)
 }

 return (
  <Pressable style={styles.container}>
   <Text style={[styles.errorText, { opacity: isError ? 1 : 0 }]}>{isError.message}</Text>
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
    <Description handleCancel={handleCancel} />
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
   <ControlButtons
    setIsPending={setIsPending}
    isEdit={false}
   />
   {isPending && <Loading />}
  </Pressable>
 )
}

const styles = StyleSheet.create({
 container: {
  position: 'absolute',
  paddingHorizontal: 12,
  paddingTop: 20,
  backgroundColor: '#000000',
  width: '98%',
  aspectRatio: 1,
  borderRadius: 70,
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
 errorText: {
  color: 'red',
  fontSize: 14,
  marginVertical: 4,
  textAlign: 'center',
 },
})

export default NewEventForm
