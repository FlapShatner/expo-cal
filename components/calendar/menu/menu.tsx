import React, { useState } from 'react'
import { View, StyleSheet, Modal } from 'react-native'
import Trigger from './trigger'
import Colors from './colors'
import ModalHeader from './modal-header'

export default function Menu() {
  const [modalVisible, setModalVisible] = useState(false)

  const handleBurgerPress = () => {
    setModalVisible(!modalVisible)
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ModalHeader setModalVisible={setModalVisible} modalVisible={modalVisible} />
            <Colors />
          </View>
        </View>
      </Modal>
      <Trigger handleBurgerPress={handleBurgerPress} />
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    marginHorizontal: 5
  },

  modalView: {
    marginLeft: 'auto',
    width: '100%',
    marginRight: 10,
    marginTop: 22,
    paddingHorizontal: 4,
    paddingVertical: 6,
    backgroundColor: '#171717',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#262626',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5
  }
})
