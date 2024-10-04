import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { ImageBackground, SafeAreaView, StatusBar, StyleSheet } from 'react-native'

const queryClient = new QueryClient()

export default function Providers({ children }) {
 return (
  <ImageBackground
   resizeMode='cover'
   source={require('../assets/cal_assets/mobile.png')}
   style={styles.bgImg}>
   <SafeAreaView style={[styles.container]}>
    <QueryClientProvider client={queryClient}>
     {children}
     <StatusBar />
    </QueryClientProvider>
   </SafeAreaView>
  </ImageBackground>
 )
}

const styles = StyleSheet.create({
 bgImg: {
  height: '101%',
  width: '100%',
  bottom: 8,
 },
 container: {
  backgroundColor: 'transparent',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'flex-start',
 },
})
