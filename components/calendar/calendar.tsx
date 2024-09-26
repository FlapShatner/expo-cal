import React, { useState } from 'react'
import Days from './days'
import { View } from 'react-native'
import MonthSelect from './month-select'
import dayjs from '../../lib/dayjs'
import Menu from './menu/menu'

export default function Calendar() {
  const initYear = Number(dayjs().format('YYYY'))
  const initMonth = Number(dayjs().format('M'))
  const [year, setYear] = useState(initYear)
  const [month, setMonth] = useState(initMonth)

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <MonthSelect year={year} month={month} setYear={setYear} setMonth={setMonth} />
        <Menu />
      </View>
      <Days year={year} month={month} />
    </View>
  )
}
