import React from 'react'
import { View, StyleSheet, Pressable, useColorScheme } from 'react-native'
import ThemeText from '../styled/ThemeText'
import dayjs from '../../lib/dayjs'
import { getLastMonthYear, getNextMonthYear } from '../../lib/date-utils'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function MonthSelect({
  year,
  month,
  setYear,
  setMonth
}: {
  year: number
  month: number
  setYear: (year: number) => void
  setMonth: (month: number) => void
}) {
  const colorScheme = useColorScheme()
  const iconColor = colorScheme === 'dark' ? '#FBFBFB' : '#1A1A1A'
  const selectedMonth = dayjs().month(month - 1).format('MMMM')
  const selectedYear = year
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.chevron}
        onPress={() => {
          const [lastMonth, lastYear] = getLastMonthYear(month, year).split('_')
          setMonth(parseInt(lastMonth))
          setYear(parseInt(lastYear))
        }}
      >
        <Ionicons name="chevron-back" size={24} color={iconColor} />
      </Pressable>
      <ThemeText style={styles.month}>
        {selectedMonth}
      </ThemeText>
      <ThemeText style={styles.year}>
        {selectedYear}
      </ThemeText>
      <Pressable
        style={styles.chevron}
        onPress={() => {
          const [nextMonth, nextYear] = getNextMonthYear(month, year).split('_')
          setMonth(parseInt(nextMonth))
          setYear(parseInt(nextYear))
        }}
      >
        <Ionicons name="chevron-forward" size={24} color={iconColor} />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '70%',
    paddingHorizontal: 20,
    marginTop: 10,
    marginHorizontal: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  month: {
    fontSize: 24,
    fontWeight: 'semibold',
    marginBottom: 10
  },
  year: {
    textAlign: 'center',
    marginLeft: 2,
    fontSize: 24,
    marginBottom: 10
  },
  chevron: {
    padding: 8,
    marginBottom: 8
  }
})
