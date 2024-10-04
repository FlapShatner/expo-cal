import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { ColorOption } from '../../../data/colorOptions'
import { FormattedWeather } from '../../../lib/weather-types'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

export default function Weather({ color, weather }: { color: ColorOption; weather: FormattedWeather | null }) {
 const showWeather = !!weather
 const maxTemp = weather ? Math.round(weather?.maxTemp) : 0
 const minTemp = weather ? Math.round(weather?.minTemp) : 0
 const precip = weather ? Math.round(weather?.precipProb) : 0
 const isTextSmall = maxTemp > 99 && precip > 99
 const bgColor = color.value
 const textColor = color.text
 return (
  <View style={[styles.weather, { backgroundColor: bgColor }]}>
   {showWeather && (
    <>
     <Text style={[styles.temp, { color: textColor }, isTextSmall && styles.textSmall]}>
      {minTemp}°/ {maxTemp}°
     </Text>
     <View style={styles.precipContainer}>
      <Text style={[styles.precip, { color: textColor }, isTextSmall && styles.textSmall]}>{precip}%</Text>
      <FontAwesome6
       name='droplet'
       size={8}
       color={textColor}
      />
     </View>
    </>
   )}
  </View>
 )
}

const styles = StyleSheet.create({
 weather: {
  position: 'absolute',
  bottom: 4,
  left: 4,
  width: 92,
  borderBottomStartRadius: 13,
  borderBottomEndRadius: 13,
  height: 16,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
 },
 temp: {
  marginLeft: 6,
  marginBottom: 2,
  fontSize: 12,
  fontWeight: 'bold',
 },
 precip: {
  marginRight: 2,
  marginBottom: 2,
  fontSize: 12,
  fontWeight: 'bold',
 },
 precipContainer: {
  marginRight: 6,
  flexDirection: 'row',
  alignItems: 'center',
 },
 textSmall: {
  fontSize: 10,
 },
})
