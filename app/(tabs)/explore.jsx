import { View, Text,TextInput } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import Category from '@/components/Home/Category';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/configs/FirebaseConfig';
import ExploreBusinesList from '../../components/Explore/ExploreBusinesList'

export default function explore() {

  const [businessList, setBusinessList] = useState([]);
  const GetBusinessByCategory=async(category)=>{
    setBusinessList([]);
    const q=query(collection(db, 'BusinessList'),where('category','==',category));
    const querySnapshot=await getDocs(q);
    querySnapshot.forEach((doc)=>{
      setBusinessList(prev=>[...prev,{id:doc._id, ...doc.data()}])
    })
  }
  return (
    <View style={{
      padding: 20
    }}>
      <Text style={{
        fontWeight: 700,
        fontSize: 25
      }}>Explore More</Text>

      <View style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
            backgroundColor: '#fff',
            padding: 5,
            marginVertical: 10,
            marginTop: 10,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: Colors.PRIMARY
        }}>
            <Ionicons name="search" size={24} color={Colors.PRIMARY} />
            <TextInput placeholder="Search..." style={{
                fontSize: 16
            }}/>
        </View>

        <Category explore={true} onCategorySelect={(category)=>GetBusinessByCategory(category)}/>

        <ExploreBusinesList business={businessList} />

    </View>
  )
}