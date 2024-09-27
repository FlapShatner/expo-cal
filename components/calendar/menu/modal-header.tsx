import React from 'react'
import { View, Pressable, Text, StyleSheet } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function ModalHeader({ setModalVisible, modalVisible }: { setModalVisible: (visible: boolean) => void; modalVisible: boolean }) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.labelContainer}>
        <Ionicons style={styles.colorIcon} name="color-palette-outline" size={26} color="#FBFBFB" />
        <Text style={styles.modalText}>Color</Text>
      </View>
      <Pressable style={[styles.buttonClose]} onPress={() => setModalVisible(!modalVisible)}>
        <Ionicons name="close" size={32} color="#FBFBFB" />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  modalText: {
    color: '#FBFBFB',
    fontSize: 22,
    fontWeight: '600'
  },

  labelContainer: {
    marginRight: 'auto',
    marginLeft: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  colorIcon: {
    marginBottom: 2,
    marginRight: 5
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  buttonClose: {
    marginRight: 12
  }
})
