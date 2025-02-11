import { View, Text, FlatList, ScrollView } from 'react-native'
import React from 'react'
import BusinessListCard from './BusinessListCard'

export default function ExploreBusinesList({businessList}) {
  return (
    <View>
      <FlatList 
        data={businessList}
        scrollEnabled
        renderItem={({item, index})=>{
            <View>
                <BusinessListCard 
                    key={index}
                    business={item}
                />
            </View>
        }}
      />
      <View style={{
        height: 200
      }}></View>
    </View>
  )
}