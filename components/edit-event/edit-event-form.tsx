import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { useStore } from '../../lib/store'
import { colors } from '../../data/config'
import Description from '../form/description'
import Location from '../form/location'
import FormButton from '../form/form-button'
import DateSelect from '../form/date-select'
import TimeSelect from '../form/time-select'
import ControlButtons from '../form/control-buttons'
import { singleEventFetch } from '../../lib/events'
import Loading from '../form/loading'

function EditEventForm() {
 const [showDescription, setShowDescription] = useState(false)
 const [showLocation, setShowLocation] = useState(false)
 const [isPending, setIsPending] = useState(false)
 const eventId = useStore((state) => state.eventId)
 const title = useStore((state) => state.title)
 const setNewStartDate = useStore((state) => state.setNewStartDate)
 const setNewEndDate = useStore((state) => state.setNewEndDate)
 const setAllDay = useStore((state) => state.setAllDay)
 const setLocation = useStore((state) => state.setLocation)
 const setTimeZone = useStore((state) => state.setTimeZone)
 const setNotes = useStore((state) => state.setNotes)
 const setTitle = useStore((state) => state.setTitle)

 useEffect(() => {
  if (!eventId) return
  const fetchEvent = async () => {
   const event = await singleEventFetch(eventId)
   setTitle(event.title)
   setNotes(event.notes)
   setLocation(event.location)
   setTimeZone(event.timeZone)
   setNewStartDate(new Date(event.startDate))
   setNewEndDate(new Date(event.endDate))
   setAllDay(event.allDay)
   if (event.notes) setShowDescription(true)
   if (event.location) setShowLocation(true)
  }
  fetchEvent()
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
  setTitle(text)
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
    isEdit={true}
   />
   {isPending && <Loading />}
  </View>
 )
}

const styles = StyleSheet.create({
 container: {
  position: 'absolute',
  paddingHorizontal: 12,
  paddingTop: 40,
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
})

export default EditEventForm
