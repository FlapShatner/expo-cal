import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, useColorScheme, View, Image, Button } from 'react-native'
import ThemeText from './styled/ThemeText'
import AsyncStorage from '@react-native-async-storage/async-storage'
import useCalendar from '../hooks/useCalendar'
import Day from './day'
import { ColorOption, colorOptions } from '../data/colorOptions'

export default function Events() {
 const [color, setColor] = useState<ColorOption>(colorOptions[0])
 const { events, calendars } = useCalendar()

 const getUserColor = async () => {
  try {
   const color = await AsyncStorage.getItem('selectedColor')
   if (color) {
    setColor(JSON.parse(color))
   }
  } catch (error) {
   console.log(error)
  }
 }

 useEffect(() => {
  getUserColor()
 }, [])

 const setUserColor = async (color: ColorOption) => {
  try {
   await AsyncStorage.setItem('selectedColor', JSON.stringify(color))
  } catch (error) {
   console.log(error)
  }
 }

 const handleSwitchColor = (color: ColorOption) => {
  const currentIndex = colorOptions.findIndex((c) => c.id === color.id)
  const nextIndex = (currentIndex + 1) % colorOptions.length
  setColor(colorOptions[nextIndex])
  setUserColor(colorOptions[nextIndex])
 }

 return (
  <ScrollView>
   <Button
    title='Switch Color'
    onPress={() => handleSwitchColor(color)}
   />
   {/* <ThemeText style={styles.text}>{events.length} Events:</ThemeText>
   {events && events.map((e: any) => <ThemeText key={e.id}>{e.title} </ThemeText>)} */}
   <Day color={color.value} />
  </ScrollView>
 )
}

const styles = StyleSheet.create({
 text: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 20,
 },
})
