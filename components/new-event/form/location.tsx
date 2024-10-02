import React from 'react'
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import Geolocation from '@react-native-community/geolocation'
import { colors } from '../../../data/config'

Geolocation.setRNConfiguration({
 skipPermissionRequests: true,
 authorizationLevel: 'whenInUse',
 locationProvider: 'auto',
})

export default function Location() {
 const [location, setLocation] = React.useState<any>(null)
 const [error, setError] = React.useState<any>(null)
 const API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY

 return (
  <GooglePlacesAutocomplete
   placeholder='Search for a location'
   textInputProps={{
    placeholderTextColor: colors.textSec,
   }}
   minLength={2}
   onPress={(data, details = null) => {
    console.log('data', data, 'details', details)
    setLocation(data)
   }}
   query={{
    key: API_KEY,
    language: 'en',
   }}
   styles={{
    textInput: {
     flexGrow: 1,
     marginVertical: 4,
     height: 38,
     borderRadius: 8,
     paddingVertical: 4,
     paddingHorizontal: 8,
     backgroundColor: '#171717',
     borderWidth: 1,
     borderColor: colors.fg,
     color: colors.textSec,
    },
   }}
  />
 )
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
 },
})
