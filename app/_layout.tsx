if (__DEV__) {
 require('../ReactotronConfig')
}
import { View, StyleSheet } from 'react-native'
import { Stack } from 'expo-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { EventProvider } from 'react-native-outside-press'

const queryClient = new QueryClient()

export default function Layout() {
 return (
  <EventProvider>
   <QueryClientProvider client={queryClient}>
    <Stack initialRouteName='index'>
     <Stack.Screen
      name='modal'
      options={{
       headerShown: false,
       presentation: 'transparentModal',
       animation: 'fade',
      }}
     />
    </Stack>
   </QueryClientProvider>
  </EventProvider>
 )
}

const styles = StyleSheet.create({
 container: {
  flexGrow: 1,
  height: '100%',
  width: '100%',
  backgroundColor: 'transparent',
 },
})
