import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { useStore } from '../../lib/store'
import { MaterialIcons } from '@expo/vector-icons'

function EditEvent({ eventId }) {
 const setIsEdit = useStore((state) => state.setIsEdit)
 const setEventId = useStore((state) => state.setEventId)

 const handleEdit = () => {
  setEventId(eventId)
  setIsEdit(true)
 }

 return (
  <TouchableOpacity
   onPress={handleEdit}
   style={styles.editButton}>
   <MaterialIcons
    name='edit'
    color={'#ebedf0'}
    size={18}
   />
  </TouchableOpacity>
 )
}

const styles = StyleSheet.create({
 editButton: {
  marginVertical: 6,
  borderRadius: 8,
  backgroundColor: 'transparent',
 },
})

export default EditEvent
