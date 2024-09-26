import React, { useState } from 'react'
import Days from './days'
import { View } from 'react-native'
import MonthSelect from './month-select'
import dayjs from '../../lib/dayjs'

export default function Calendar() {
  const initYear = Number(dayjs().format('YYYY'))
  const initMonth = Number(dayjs().format('M'))
  const [year, setYear] = useState(initYear)
  const [month, setMonth] = useState(initMonth)

  return (
    <View>
      <MonthSelect year={year} month={month} setYear={setYear} setMonth={setMonth} />
      <Days year={year} month={month} />
    </View>
  )
}
