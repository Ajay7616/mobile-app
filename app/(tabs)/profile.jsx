import { View, Text } from 'react-native'
import React from 'react'
import UserIntro from '../../components/Profile/UserIntro'
import MenuList from '../../components/Profile/MenuList'

export default function profile() {
  return (
    <View style={{
      padding: 20
    }}>
      <Text style={{
        fontWeight: 700,
        fontSize: 35
      }}>Profile</Text>

      <UserIntro />

      <MenuList />
    </View>
  )
}