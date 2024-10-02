import React from 'react'
import Calendar from '../components/calendar/calendar'
import { ScrollView } from 'react-native'

export default function Page() {
 return (
  <ScrollView style={{ width: '100%' }}>
   <Calendar />
  </ScrollView>
 )
}
