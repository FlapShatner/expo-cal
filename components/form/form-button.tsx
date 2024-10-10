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

 const bgColor = color.value
 const textColor = color.text
 return (
  <TouchableOpacity
   onPress={handlePress}
   style={[styles.editButton, { backgroundColor: bgColor }]}>
   <Text style={[styles.text, { color: textColor }]}>{text}</Text>
  </TouchableOpacity>
 )
}

const styles = StyleSheet.create({
 editButton: {
  marginVertical: 6,
  width: '55%',
  padding: 8,
  borderRadius: 8,
 },
 text: {
  color: '#ebedf0',
  fontSize: 14,
  fontWeight: 'bold',
 },
})
