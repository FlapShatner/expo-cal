import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Button, useColorScheme } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import Events from './components/events'

export default function App() {
 const colorScheme = useColorScheme()
 const theme = colorScheme === 'dark' ? 'darkTheme' : 'lightTheme'
 const textTheme = colorScheme === 'dark' ? 'darkText' : 'lightText'
 return (
  <SafeAreaView style={[styles.container, styles[theme]]}>
   <Events />
   <StatusBar />
  </SafeAreaView>
 )
}

const styles = StyleSheet.create({
 container: {
  paddingTop: 60,
  flex: 1,
  alignItems: 'center',
  justifyContent: 'flex-start',
 },
 text: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 20,
 },
 lightText: {
  color: '#1A1A1A',
 },
 lightTheme: {
  backgroundColor: '#F5F5F5',
 },
 darkTheme: {
  backgroundColor: '#1A1A1A',
 },
 darkText: {
  color: '#FBFBFB',
 },
})
