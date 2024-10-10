import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { ColorOption } from '../../data/colorOptions'
import { usePathname } from 'expo-router'
import { FormattedWeather } from '../../lib/weather-types'

export default function DetailWeather({ color, weather }: { color: ColorOption; weather: FormattedWeather | null }) {
 const maxTemp = weather ? Math.round(weather?.maxTemp) : 0
 const minTemp = weather ? Math.round(weather?.minTemp) : 0
 const precip = weather ? Math.round(weather?.precipProb) : 0

 const path = usePathname()
 const isNew = path === '/modal/new'
 const isEdit = path === '/modal/edit'

 const textColor = color.text
 return (
  <Pressable style={[styles.weather]}>
   {!isNew && !isEdit && (
    <>
     <Text style={[styles.temp, { color: textColor }]}>
      {minTemp}°/ {maxTemp}°
     </Text>
     <View style={styles.precipContainer}>
      <Text style={[styles.precip, { color: textColor }]}>{precip}%</Text>
      <FontAwesome6
       name='droplet'
       size={16}
       color={textColor}
      />
     </View>
    </>
   )}
  </Pressable>
 )
}

const styles = StyleSheet.create({
 weather: {
  position: 'absolute',
  bottom: 24,
  paddingHorizontal: 40,
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
 },
 temp: {
  marginLeft: 6,
  marginBottom: 2,
  fontSize: 24,
  fontWeight: 'bold',
 },
 precip: {
  marginRight: 5,
  marginBottom: 2,
  fontSize: 24,
  fontWeight: 'bold',
 },
 precipContainer: {
  marginRight: 6,
  flexDirection: 'row',
  alignItems: 'center',
 },
})
