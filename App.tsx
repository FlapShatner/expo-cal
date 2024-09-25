import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Button } from 'react-native'
import { SafeAreaView, useSafeAreaFrame } from 'react-native-safe-area-context'
import { GoogleSignin, GoogleSigninButton, User, SignInResponse } from '@react-native-google-signin/google-signin'
import Events from './components/events'

GoogleSignin.configure({
 offlineAccess: true,
 webClientId: process.env.EXPO_PUBLIC_WEB_GOOGLE_CLIENT_ID,
 scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
})

export type Tokens = {
 accessToken: string
 idToken: string
}

export default function App() {
 const [user, setUser] = useState<User | null>(null)
 const [tokens, setTokens] = useState<any>(null)

 const getCurrentUser = async () => {
  try {
   const user = GoogleSignin.getCurrentUser()
   if (!user) {
    console.log('No user is signed in.')
    silentSignIn()
    return
   }
   setUser(user)
  } catch (error) {
   console.log('Error getting current user: ', error)
  }
 }

 const silentSignIn = async () => {
  const userInfo = await GoogleSignin.signInSilently()
  if (userInfo) {
   setUser(userInfo.data)
  }
 }

 const getTokens = async () => {
  const tokens = await GoogleSignin.getTokens()
  // console.log(tokens)
  setTokens(tokens)
 }

 useEffect(() => {
  if (!user || !!tokens) return
  getTokens()
 }, [user])

 useEffect(() => {
  getCurrentUser()
 }, [])

 const handleSignOut = async () => {
  await GoogleSignin.signOut()
  setUser(null)
 }

 const handlePressSignIn = async () => {
  try {
   await GoogleSignin.hasPlayServices()
   const userInfo = await GoogleSignin.signIn()
   setUser(userInfo.data)
   console.log(userInfo)
  } catch (error) {
   if (error) {
    console.log('Error related to Google sign-in: ', error)
   } else {
    console.log('An error that is not related to Google sign-in: ', error)
   }
  }
 }

 return (
  <SafeAreaView style={styles.container}>
   {!user && <GoogleSigninButton onPress={() => handlePressSignIn()} />}
   {user && <Text style={styles.text}>Signed in as: {user.user.name}</Text>}
   {user && (
    <Button
     title='Sign out'
     onPress={handleSignOut}
    />
   )}
   <Events />
   <StatusBar style='auto' />
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
})
