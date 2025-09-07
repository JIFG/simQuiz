import { View, Text } from 'react-native'
import React from 'react'
import Home from '@/src/components/Home'
import { SafeAreaView } from 'react-native-safe-area-context'

const index = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <Home/>
    </SafeAreaView>
  )
}

export default index