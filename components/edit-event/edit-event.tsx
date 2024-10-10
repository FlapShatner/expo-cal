import React from 'react'
import { router } from 'expo-router'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { singleEventFetch } from '../../lib/events'
import { useStore } from '../../lib/store'
import { MaterialIcons } from '@expo/vector-icons'

function EditEvent({ eventIdProp }) {
 const eventId = useStore((state) => state.eventId)
 const setEventId = useStore((state) => state.setEventId)
 const setIsEdit = useStore((state) => state.setIsEdit)

 const handlePress = () => {
  setEventId(eventIdProp)
  setIsEdit(true)
  router.push('/modal/edit')
 }

 return (
  <TouchableOpacity
   onPress={handlePress}
   style={styles.editButton}>
   <MaterialIcons
    name='edit'
    color={'#ebedf0'}
    size={20}
   />
  </TouchableOpacity>
 )
}

const styles = StyleSheet.create({
 editButton: {
  marginVertical: 6,
  padding: 6,
  borderRadius: 8,
  backgroundColor: 'transparent',
 },
})

export default EditEvent
