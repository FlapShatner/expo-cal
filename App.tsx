if (__DEV__) {
  require('./ReactotronConfig')
}
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { ImageBackground, ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Calendar from './components/calendar/calendar'
import { EventProvider } from 'react-native-outside-press'

const queryClient = new QueryClient()

export default function App() {
  return (
    <EventProvider>
      <ImageBackground resizeMode="cover" source={require('./assets/cal_assets/mobile.png')} style={styles.bgImg}>
        <SafeAreaView style={[styles.container]}>
          <QueryClientProvider client={queryClient}>
            <ScrollView style={{ width: '100%' }}>
              <Calendar />
              <StatusBar />
            </ScrollView>
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
    bottom: 8
  },
  container: {
    paddingTop: 20,
    backgroundColor: 'transparent',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
})
