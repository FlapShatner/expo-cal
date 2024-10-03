import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { colors } from '../../data/config'
import CancelInput from './cancel-input'
import { useStore } from '../../lib/store'

export default function Description({ handleCancel }) {
 const notes = useStore((state) => state.notes)
 const setNotes = useStore((state) => state.setNotes)
 const handleNotesChange = (text: string) => {
  setNotes(text)
 }

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
