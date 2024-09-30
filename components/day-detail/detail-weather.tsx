import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ColorOption } from '../../data/colorOptions';
import { FormattedWeather } from '../../lib/weather-types';

export default function DetailWeather({ color, weather }: { color: ColorOption, weather: FormattedWeather | null }) {
    const maxTemp = weather ? Math.round(weather?.maxTemp) : 0
    const minTemp = weather ? Math.round(weather?.minTemp) : 0
    const precip = weather ? Math.round(weather?.precipProb) : 0
  return (
    <View style={[styles.weather]}>
      <Text style={[styles.temp,{ color: color.text }]}>{minTemp}°/ {maxTemp}°</Text>
      <View style={styles.precipContainer}>
      <Text style={[styles.precip,{ color: color.text }]}>{precip}% 
      </Text>
      <FontAwesome6 name="droplet" size={16} color={color.text} />
      </View>
    </View>
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
        justifyContent: 'space-between'
      },
      temp: {
        marginLeft: 6,
        marginBottom: 2,
        fontSize: 24,
        fontWeight: 'bold'
      },
      precip: {
        marginRight: 5,
        marginBottom: 2,
        fontSize: 24,
        fontWeight: 'bold'
      },
      precipContainer: {
        marginRight: 6,
        flexDirection: 'row',
        alignItems: 'center'
      }
})
