import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { colors } from '../../../data/config'
import CancelInput from './cancel-input'

export default function Description({ handleNotesChange, notes, handleCancel }) {
 return (
  <View style={styles.inputWrapper}>
   <TextInput
    style={[styles.notesInput, { color: colors.textSec }]}
    placeholder={`Description`}
    value={notes}
    placeholderTextColor={colors.textSec}
    onChangeText={handleNotesChange}
   />
   <CancelInput onPress={() => handleCancel('notes')} />
  </View>
 )
}

const styles = StyleSheet.create({
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
 inputWrapper: {
  flexDirection: 'row',
  alignItems: 'center',
 },
})
