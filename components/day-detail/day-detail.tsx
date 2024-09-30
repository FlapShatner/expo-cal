import React from 'react'
import { ImageBackground, Modal, StyleSheet, View } from 'react-native'
import { useStore } from '../../lib/store'
import DetailContent from './detail-content'
import DetailHeader from './detail-header'
import DetailWeather from './detail-weather'
import OutsidePressHandler from 'react-native-outside-press'

export default function DayDetail() {
  const date = useStore(state => state.dayDetails?.date)
  const weather = useStore(state => state.dayDetails?.weather)
  const events = useStore(state => state.dayDetails?.events)
  const detailVisible = useStore(state => state.detailVisible)
  const setDetailVisible = useStore(state => state.setDetailVisible)
  const color = useStore(state => state.color)

  const handleOutsidePress = () => {
    setDetailVisible(false)
  }

  return (
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={detailVisible}
          onRequestClose={() => {
            setDetailVisible(!detailVisible)
          }}
        >
            <OutsidePressHandler disabled={!detailVisible} onOutsidePress={handleOutsidePress}>
          <ImageBackground resizeMode="contain" source={require('../../assets/cal_assets/bg_lg_e.png')} style={styles.bg}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={[styles.inner, { backgroundColor: color.value }]} />
                <DetailHeader date={date ?? ''} color={color} />  
                <DetailContent color={color} events={events ?? null} />
                <DetailWeather color={color} weather={weather ?? null} />
              </View>
            </View>
          </ImageBackground>
        </OutsidePressHandler>
        </Modal>
      </View>      
  )
}
const styles = StyleSheet.create({
  bg: {
    position: 'absolute',
    width: '100%',
    aspectRatio: 1,
    marginTop: '50%'
  },
  inner: {
    borderRadius: 70,
    width: '98%',
    aspectRatio: 1,
    marginTop: 3
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5
  },
  modalView: {
    position: 'relative',
    marginLeft: 'auto',
    width: '100%',
    paddingHorizontal: 4,
    paddingVertical: 6,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center'
  },
  overlay: {
    position: 'absolute',
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1001,
    display: 'none'
  },
  visible: {
    display: 'flex'
  }
})
