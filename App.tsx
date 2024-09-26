if (__DEV__) {
  require('./ReactotronConfig')
}
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, ScrollView, ImageBackground } from 'react-native'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { SafeAreaView } from 'react-native-safe-area-context'
import Calendar from './components/calendar/calendar'

const queryClient = new QueryClient()

export default function App() {
  return (
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
