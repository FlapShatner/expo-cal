import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import dayjs from '../../lib/dayjs'
import DayDetail from '../day-detail/day-detail'
import Days from './days'
import Menu from './menu/menu'
import MonthSelect from './month-select'

export default function Calendar() {
  const initYear = Number(dayjs().format('YYYY'))
  const initMonth = Number(dayjs().format('M'))
  const [year, setYear] = useState(initYear)
  const [month, setMonth] = useState(initMonth)

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Menu />
        <MonthSelect year={year} month={month} setYear={setYear} setMonth={setMonth} />
      </View>
      <Days year={year} month={month} />
      <DayDetail />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 4
  },
  headerContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})
