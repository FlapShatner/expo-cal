import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { ColorOption } from '../../../data/colorOptions'
import { FormattedWeather } from '../../../lib/weather-types'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function Weather({ color, weather }: { color: ColorOption, weather: FormattedWeather | null }) {
    const maxTemp = weather ? Math.round(weather?.maxTemp) : 0
    const minTemp = weather ? Math.round(weather?.minTemp) : 0
    const precip = weather ? Math.round(weather?.precipProb) : 0
  return (
    <View style={[styles.weather, { backgroundColor: color.value }]}>
      <Text style={[styles.temp,{ color: color.text }]}>{minTemp}°/ {maxTemp}°</Text>
      <View style={styles.precipContainer}>
      <Text style={[styles.precip,{ color: color.text }]}>{precip}% 
      </Text>
      <FontAwesome6 name="droplet" size={8} color={color.text} />
      </View>
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
    justifyContent: 'space-between'
  },
  temp: {
    marginLeft: 4,
    marginBottom: 2,
    fontSize: 12,
    fontWeight: 'bold'
  },
  precip: {
    marginRight: 2,
    marginBottom: 2,
    fontSize: 12,
    fontWeight: 'bold'
  },
  precipContainer: {
    marginRight: 4,
    flexDirection: 'row',
    alignItems: 'center'
  }
})
