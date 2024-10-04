import React, { useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import Geolocation from '@react-native-community/geolocation'
import { colors } from '../../data/config'
import CancelInput from './cancel-input'
import { useStore } from '../../lib/store'

Geolocation.setRNConfiguration({
 skipPermissionRequests: true,
 authorizationLevel: 'whenInUse',
 locationProvider: 'auto',
})

export default function Location({ handleCancel }) {
 const locRef = React.useRef<any>(null)
 const location = useStore((state) => state.location)
 const setLocation = useStore((state) => state.setLocation)
 const [error, setError] = React.useState<any>(null)
 const API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY

 useEffect(() => {
  if (location) {
   locRef.current.setAddressText(location)
  }
 }, [])

 return (
  <View style={styles.locationWrapper}>
   <GooglePlacesAutocomplete
    ref={locRef}
    placeholder='Search for a location'
    textInputProps={{
     placeholderTextColor: colors.textSec,
     selectTextOnFocus: true,
    }}
    minLength={2}
    onPress={(data, details = null) => {
     //  console.log('data', data, 'details', details)
     setLocation(data.description)
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
   <CancelInput onPress={() => handleCancel('location')} />
  </View>
 )
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
 },
 locationWrapper: {
  flexDirection: 'row',
  alignItems: 'center',
 },
})
