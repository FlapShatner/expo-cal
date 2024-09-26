import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, useColorScheme, View, Image, Button } from 'react-native'
import ThemeText from '../styled/ThemeText'
import AsyncStorage from '@react-native-async-storage/async-storage'
import useCalendar, { CalendarEvent, CalendarCalendar } from '../../hooks/useCalendar'
import Day from './day/day'
import { ColorOption, colorOptions } from '../../data/colorOptions'
import { days, Day as DayType } from '../../lib/date-utils'

export default function Days({ year, month }: { year: number; month: number }) {
  const [color, setColor] = useState<ColorOption>(colorOptions[0])
  const calendarData: { calendarEvents: CalendarEvent[]; calendars: CalendarCalendar[] } = useCalendar()

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
    const currentIndex = colorOptions.findIndex(c => c.id === color.id)
    const nextIndex = (currentIndex + 1) % colorOptions.length
    setColor(colorOptions[nextIndex])
    setUserColor(colorOptions[nextIndex])
  }

  const daysArray = days(year, month, 32)

  return (
    <View style={styles.grid}>
      {daysArray.map((day: DayType) =>
        <View key={day.date} style={styles.gridItem}>
          <Day calendarData={calendarData} color={color} day={day} />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 'auto'
  },
  gridItem: {
    width: '25%',
    marginBottom: 8
  },
  text: {
    fontSize: 20,
    fontWeight: 'semibold',
    marginBottom: 20
  }
})
