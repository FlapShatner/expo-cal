import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { colors } from '../../data/config'
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons'

export default function CancelInput({ onPress }: { onPress?: () => void }) {
 return (
  <TouchableOpacity
   style={styles.cancel}
   onPress={onPress}>
   <Icon
    name='cancel'
    size={24}
    color={colors.fg}
   />
  </TouchableOpacity>
 )
}

const styles = StyleSheet.create({
 cancel: {
  marginLeft: 8,
 },
})
