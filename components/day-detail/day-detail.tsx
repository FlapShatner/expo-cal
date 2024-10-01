import React from 'react'
import { Dimensions, ImageBackground, Platform, ScrollView, StyleSheet, View } from 'react-native'
import Modal from 'react-native-modal'
import { useStore } from '../../lib/store'
import DetailContent from './detail-content'
import DetailHeader from './detail-header'
import DetailWeather from './detail-weather'
import NewEventForm from '../new-event/new-event-form'
import { useQuery } from '@tanstack/react-query'
import { dayEventsFetch } from '../../lib/events'
import dayjs from '../../lib/dayjs'
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Platform.OS === 'ios' ? Dimensions.get('window').height : require('react-native-extra-dimensions-android').get('REAL_WINDOW_HEIGHT')

export default function DayDetail() {
 const date = useStore((state) => state.dayDetails?.date)
 const weather = useStore((state) => state.dayDetails?.weather)
 const events = useStore((state) => state.dayDetails?.events)
 const detailVisible = useStore((state) => state.detailVisible)
 const setDetailVisible = useStore((state) => state.setDetailVisible)
 const color = useStore((state) => state.color)
 const isNewEvent = useStore((state) => state.isNewEvent)
 const setIsNewEvent = useStore((state) => state.setIsNewEvent)

 const fetchEvents = async ({ queryKey }) => {
  const [date] = queryKey
  const startDate = dayjs(date).subtract(1, 'day').format()
  const endDate = dayjs(date).add(1, 'day').format()
  const events = await dayEventsFetch({ startDate, endDate })
  const filtered = events?.filter((event) => dayjs(event.startDate).utc().format('YYYY-MM-DD') === date)
  console.log('startdate', startDate, 'date', date)
  console.log('filtered', filtered)
  return filtered
 }

 const { data: todayEvents, isLoading } = useQuery({
  queryKey: [date],
  queryFn: fetchEvents,
  refetchOnWindowFocus: false,
 })

 const handleOutsidePress = () => {
  setDetailVisible(false)
 }

 return (
  <View style={styles.centeredView}>
   <Modal
    style={styles.visible}
    deviceHeight={deviceHeight}
    deviceWidth={deviceWidth}
    isVisible={detailVisible}
    animationIn={'zoomIn'}
    animationOut={'zoomOut'}
    backdropOpacity={0.5}
    onBackdropPress={handleOutsidePress}
    backdropTransitionOutTiming={0}
    propagateSwipe={true}>
    <ImageBackground
     resizeMode='contain'
     source={require('../../assets/cal_assets/bg_lg_e.png')}
     style={styles.bg}>
     <View style={styles.centeredView}>
      <View style={styles.modalView}>
       <View style={[styles.inner, { backgroundColor: color.value }]} />
       <DetailHeader
        date={date ?? ''}
        color={color}
       />
       {isNewEvent ? (
        <NewEventForm />
       ) : (
        <DetailContent
         color={color}
         events={todayEvents ?? null}
        />
       )}
       <DetailWeather
        color={color}
        weather={weather ?? null}
       />
      </View>
     </View>
    </ImageBackground>
   </Modal>
  </View>
 )
}
const styles = StyleSheet.create({
 bg: {
  position: 'absolute',
  width: '100%',
  aspectRatio: 1,
 },
 inner: {
  borderRadius: 70,
  width: '98%',
  aspectRatio: 1,
  marginTop: 3,
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
 overlay: {
  position: 'absolute',
  flex: 1,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  zIndex: 1001,
  display: 'none',
 },
 visible: {
  margin: 4,
 },
})
