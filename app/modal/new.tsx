import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router'
import { useStore } from '../../lib/store'
import NewEventForm from '../../components/new-event/new-event-form'
import { View, StyleSheet, Text, ImageBackground } from 'react-native'

export default function New() {
 return <NewEventForm />
}
