import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Modal, StyleSheet, ActivityIndicator } from 'react-native'
import { useStore } from '../../lib/store'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Ionicons } from '@expo/vector-icons'
import { deleteEvent } from '../../lib/events'

function DeleteEvent({ eventId }) {
 const [isLoading, setIsLoading] = useState(false)
 const [open, setOpen] = useState(false)
 const queryClient = useQueryClient()
 const date = useStore((state) => state.dayDetails?.date)

 const mutation = useMutation({
  mutationFn: (eventId: string) => deleteEvent(eventId),
  onSuccess: () => {
   queryClient.invalidateQueries({ queryKey: [date] })
   queryClient.invalidateQueries({ queryKey: ['events'] })
   setOpen(false)
  },
  onSettled: () => {
   setIsLoading(false)
  },
 })

 const handleOpen = () => {
  setOpen(true)
 }

 const handleDelete = () => {
  console.log('deleting event', eventId)
  setIsLoading(true)
  mutation.mutate(eventId)
 }

 const handleCancel = () => {
  setOpen(false)
 }

 return (
  <View>
   <TouchableOpacity
    onPress={handleOpen}
    style={styles.deleteButton}>
    <Ionicons
     name='trash'
     style={styles.icon}
     size={20}
    />
   </TouchableOpacity>
   <Modal
    transparent
    visible={open}
    animationType='fade'>
    <View style={styles.modalOverlay}>
     <View style={styles.modalContent}>
      {isLoading && (
       <View style={styles.loadingOverlay}>
        <ActivityIndicator
         size='large'
         color='#fff'
        />
       </View>
      )}
      <Text style={styles.modalText}>Delete event?</Text>
      <View style={styles.buttonRow}>
       <TouchableOpacity
        onPress={handleDelete}
        style={styles.yesButton}>
        <Text style={styles.buttonText}>Yes</Text>
       </TouchableOpacity>
       <TouchableOpacity
        onPress={handleCancel}
        style={styles.noButton}>
        <Text style={styles.noButtonText}>No</Text>
       </TouchableOpacity>
      </View>
     </View>
    </View>
   </Modal>
  </View>
 )
}

const styles = StyleSheet.create({
 deleteButton: {
  marginVertical: 6,
  borderRadius: 8,
  padding: 6,
  backgroundColor: 'transparent',
 },
 icon: {
  width: 20,
  height: 20,
  color: '#961717',
 },
 modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent overlay
  justifyContent: 'center',
  alignItems: 'center',
 },
 modalContent: {
  width: 200,
  padding: 16,
  backgroundColor: '#171717',
  borderWidth: 1,
  borderColor: '#262626',
  borderRadius: 8,
  alignItems: 'center',
 },
 loadingOverlay: {
  ...StyleSheet.absoluteFillObject,
  backgroundColor: 'rgba(255,0,0,0.8)',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 8,
 },
 modalText: {
  color: '#fff',
  fontSize: 16,
 },
 buttonRow: {
  flexDirection: 'row',
  marginTop: 16,
 },
 yesButton: {
  paddingVertical: 8,
  paddingHorizontal: 16,
  backgroundColor: '#ff4d4d',
  borderRadius: 8,
  marginRight: 8,
 },
 noButton: {
  paddingVertical: 8,
  paddingHorizontal: 16,
  backgroundColor: '#fff',
  borderRadius: 8,
 },
 buttonText: {
  color: '#fff',
  fontWeight: 'bold',
 },
 noButtonText: {
  color: 'red',
  fontWeight: 'bold',
 },
})

export default DeleteEvent
