import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, ScrollView, Button, useColorScheme, ImageBackground } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Calendar from './components/calendar/calendar'

export default function App() {
  const colorScheme = useColorScheme()
  const theme = colorScheme === 'dark' ? 'darkTheme' : 'lightTheme'
  const textTheme = colorScheme === 'dark' ? 'darkText' : 'lightText'
  return (
    <ImageBackground resizeMode="cover" source={require('./assets/cal_assets/mobile.png')} style={styles.bgImg}>
      <SafeAreaView style={[styles.container]}>
        <ScrollView style={{ width: '100%' }}>
          <Calendar />
          <StatusBar />
        </ScrollView>
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
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },
  lightText: {
    color: '#1A1A1A'
  },
  lightTheme: {
    backgroundColor: '#F5F5F5'
  },
  darkTheme: {
    backgroundColor: '#1A1A1A'
  },
  darkText: {
    color: '#FBFBFB'
  }
})
