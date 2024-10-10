import React from 'react'
import { Pressable, ImageBackground, View, StyleSheet } from 'react-native'
import { useStore } from '../../lib/store'
import { router, Stack, Slot, usePathname } from 'expo-router'
import DetailHeader from '../../components/day-detail/detail-header'
import DetailWeather from '../../components/day-detail/detail-weather'

export default function ModalLayout() {
 const date = useStore((state) => state.dayDetails?.date)
 const weather = useStore((state) => state.dayDetails?.weather)
 const color = useStore((state) => state.color)
 const clearForm = useStore((state) => state.clearForm)
 const bgColor = color.value
 const path = usePathname()
 const isNew = path === '/modal/new'

 const handleOutsidePress = () => {
  clearForm()
  router.push('/')
 }
 return (
  <Pressable
   style={styles.overlay}
   onPress={handleOutsidePress}>
   <ImageBackground
    resizeMode='contain'
    source={require('../../assets/cal_assets/bg_lg_e.png')}
    style={bg(isNew).bg}>
    <View style={styles.centeredView}>
     <View style={styles.modalView}>
      {!isNew && <View style={inner(bgColor, isNew).inner} />}
      <DetailHeader
       date={date ?? ''}
       color={color}
      />
      <Slot />
      <DetailWeather
       color={color}
       weather={weather ?? null}
      />
     </View>
    </View>
   </ImageBackground>
  </Pressable>
 )
}

const inner = (color: string, isNew: boolean) =>
 StyleSheet.create({
  inner: {
   borderRadius: 70,
   width: '98%',
   aspectRatio: 1,
   backgroundColor: color,
  },
 })

const styles = StyleSheet.create({
 centeredView: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  marginHorizontal: 5,
 },
 modalView: {
  position: 'relative',
  marginLeft: 'auto',
  width: '100%',
  paddingHorizontal: 4,
  paddingVertical: 6,
  borderRadius: 70,
  alignItems: 'center',
  justifyContent: 'center',
 },
 overlay: {
  position: 'absolute',
  flex: 1,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
 },
})

const bg = (isNew: boolean) =>
 StyleSheet.create({
  bg: {
   position: 'absolute',
   bottom: 0,
   width: '100%',
   height: isNew ? '100%' : '100%',
   aspectRatio: 1,
  },
 })
