import { useNavigation } from 'expo-router'
import Providers from '../components/providers'
import React, { useEffect } from 'react'
import Calendar from '../components/calendar/calendar'
import { ScrollView } from 'react-native'

export default function Home() {
 const nav = useNavigation()
 useEffect(() => {
  nav.setOptions({
   headerShown: false,
  })
 }, [])
 return (
  <Providers>
   <ScrollView style={{ width: '100%' }}>
    <Calendar />
   </ScrollView>
  </Providers>
 )
}
