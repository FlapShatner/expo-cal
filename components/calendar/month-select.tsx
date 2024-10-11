import React from 'react'
import { View, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import ThemeText from '../styled/ThemeText'
import dayjs from '../../lib/dayjs'
import { getLastMonthYear, getNextMonthYear } from '../../lib/date-utils'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function MonthSelect({
 year,
 month,
 setYear,
 setMonth,
}: {
 year: number
 month: number
 setYear: (year: number) => void
 setMonth: (month: number) => void
}) {
 const iconColor = '#FBFBFB'
 const selectedMonth = dayjs()
  .month(month - 1)
  .format('MMMM')
 const selectedYear = year
 return (
  <View style={styles.container}>
   <TouchableOpacity
    style={[styles.chevron, styles.chevLeft]}
    onPress={() => {
     const [lastMonth, lastYear] = getLastMonthYear(month, year).split('_')
     setMonth(parseInt(lastMonth))
     setYear(parseInt(lastYear))
    }}>
    <Ionicons
     name='chevron-back'
     size={28}
     color={iconColor}
    />
   </TouchableOpacity>
   <View style={styles.textContainer}>
    <ThemeText style={styles.month}>{selectedMonth}</ThemeText>
    <ThemeText style={styles.year}>{selectedYear}</ThemeText>
   </View>
   <TouchableOpacity
    style={[styles.chevron, styles.chevRight]}
    onPress={() => {
     const [nextMonth, nextYear] = getNextMonthYear(month, year).split('_')
     setMonth(parseInt(nextMonth))
     setYear(parseInt(nextYear))
    }}>
    <Ionicons
     name='chevron-forward'
     size={28}
     color={iconColor}
    />
   </TouchableOpacity>
  </View>
 )
}

const styles = StyleSheet.create({
 container: {
  backgroundColor: '#171717',
  borderRadius: 18,
  width: '100%',
  borderWidth: 1,
  borderColor: '#262626',
  shadowColor: '#000',
  shadowOffset: {
   width: 2,
   height: 2,
  },
  shadowOpacity: 0.8,
  marginBottom: 10,
  marginTop: 60,
  marginHorizontal: 'auto',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
 },
 textContainer: {
  flex: 1,
  flexDirection: 'row',
  gap: 8,
  justifyContent: 'center',
 },
 month: {
  fontSize: 28,
  fontWeight: 'semibold',
  marginBottom: 2,
 },
 year: {
  textAlign: 'center',
  marginLeft: 0,
  fontSize: 28,
  marginBottom: 2,
 },
 chevron: {
  paddingVertical: 8,
  paddingHorizontal: 12,
  // borderTopRightRadius: 18,
  // borderBottomRightRadius: 18,
  marginBottom: 0,
  backgroundColor: '#262626',
 },
 chevLeft: {
  borderTopLeftRadius: 18,
  borderBottomLeftRadius: 18,
 },
 chevRight: {
  borderTopRightRadius: 18,
  borderBottomRightRadius: 18,
 },
})
