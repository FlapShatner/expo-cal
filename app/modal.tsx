import React, { useEffect } from 'react'
import { Dimensions, ImageBackground, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native'

import { router, useNavigation } from 'expo-router'
import { useStore } from '../lib/store'
import DetailContent from '../components/day-detail/detail-content'
import DetailHeader from '../components/day-detail/detail-header'
import DetailWeather from '../components/day-detail/detail-weather'
import { filterEvents } from '../lib/date-utils'
import { useQuery } from '@tanstack/react-query'
import { dayEventsFetch } from '../lib/events'
import dayjs from '../lib/dayjs'
import OutsidePressHandler from 'react-native-outside-press'

export default function Modal() {
 const date = useStore((state) => state.dayDetails?.date)
 const weather = useStore((state) => state.dayDetails?.weather)
 const events = useStore((state) => state.dayDetails?.events)
 const detailVisible = useStore((state) => state.detailVisible)
 const setDetailVisible = useStore((state) => state.setDetailVisible)
 const color = useStore((state) => state.color)
 const timeZone = useStore((state) => state.timeZone)
 const nav = useNavigation()

 const fetchEvents = async ({ queryKey }) => {
  const [date] = queryKey
  const startDate = dayjs(date).tz(timeZone).startOf('day').subtract(1, 'day').toString()
  const endDate = dayjs(date).tz(timeZone).endOf('day').add(1, 'day').toString()
  const events = await dayEventsFetch({ startDate, endDate })
  if (!events) return
  const filtered = filterEvents(events, date)
  return filtered
 }

 const { data: todayEvents, isLoading } = useQuery({
  queryKey: [date],
  queryFn: fetchEvents,
  refetchOnWindowFocus: false,
 })

 const handleOutsidePress = () => {
  router.push('/')
 }

 const bgColor = color.value
 return (
  <OutsidePressHandler
   disabled={!detailVisible}
   onOutsidePress={handleOutsidePress}>
   <ImageBackground
    resizeMode='contain'
    source={require('../assets/cal_assets/bg_lg_e.png')}
    style={styles.bg}>
    <View style={styles.centeredView}>
     <View style={styles.modalView}>
      <View style={inner(bgColor).inner} />
      <DetailHeader
       date={date ?? ''}
       color={color}
      />
      <DetailContent
       color={color}
       events={todayEvents ?? null}
      />
      <DetailWeather
       color={color}
       weather={weather ?? null}
      />
     </View>
    </View>
   </ImageBackground>
  </OutsidePressHandler>
 )
}

const inner = (color: string) =>
 StyleSheet.create({
  inner: {
   borderRadius: 70,
   width: '98%',
   aspectRatio: 1,
   marginTop: 3,
   backgroundColor: color,
  },
 })

const styles = StyleSheet.create({
 bg: {
  position: 'absolute',
  width: '100%',
  aspectRatio: 1,
  top: '25%',
 },
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
})
