import { Slot } from 'expo-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { ImageBackground, ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { EventProvider } from 'react-native-outside-press'

const queryClient = new QueryClient()

export default function Layout() {
 return (
  <EventProvider>
   <ImageBackground
    resizeMode='cover'
    source={require('../assets/cal_assets/mobile.png')}
    style={styles.bgImg}>
    <SafeAreaView style={[styles.container]}>
     <QueryClientProvider client={queryClient}>
      <Slot />
      <StatusBar />
     </QueryClientProvider>
    </SafeAreaView>
   </ImageBackground>
  </EventProvider>
 )
}

const styles = StyleSheet.create({
 bgImg: {
  height: '101%',
  width: '101%',
  bottom: 8,
 },
 container: {
  backgroundColor: 'transparent',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'flex-start',
 },
})
