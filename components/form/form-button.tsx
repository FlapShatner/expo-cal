import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { useStore } from '../../lib/store'
import { MaterialIcons } from '@expo/vector-icons'

export default function FormButton({ onPress, text }: { onPress: () => void; text: string }) {
 const color = useStore((state) => state.color)
 const handlePress = () => {
  //   console.log('handlePress')
  onPress()
 }

 return (
  <TouchableOpacity
   onPress={handlePress}
   style={[styles.editButton, { backgroundColor: color.value }]}>
   <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
 )
}

const styles = StyleSheet.create({
 editButton: {
  marginVertical: 6,
  width: '50%',
  padding: 8,
  borderRadius: 8,
 },
 text: {
  color: '#ebedf0',
  fontWeight: 'bold',
 },
})
