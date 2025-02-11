import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'

export default function CategoryItem({category, onCategoryPress}) {
  return (
    <TouchableOpacity onPress={() => onCategoryPress(category)}>
        <View style={{
            padding: 10,
            backgroundColor: Colors.ICON_BG,
            borderRadius: 99,
            marginRight: 15,
        }}>
            <Image 
                source={{uri:category.icon}}
                style={{
                    width: 40,
                    height: 40,
                    alignContent: 'center'
                }}
            />
        </View>
        <Text style={{
            fontSize: 12,
            marginTop: 5,
            textAlign: 'center'
        }}>{category.name}</Text>
    </TouchableOpacity>
  )
}