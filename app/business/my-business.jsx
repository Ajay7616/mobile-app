import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-expo'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import { BusinessListCard } from '../../components/BusinessList/BusinessListCard'
import { useNavigation } from 'expo-router';
import { Colors } from '../../constants/Colors';

export default function MyBusines() {

    const {user} = useUser();
    const [businnessList, setBusinessList] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    useEffect(()=>{
      navigation.setOptions({
        headerShown: true,
        headerTitle: 'My Business',
        headerStyle: {
          backgroundColor: Colors.PRIMARY,
          
        }
      })
      user&&GetUserBusiness();
    },[user])

    const GetUserBusiness=async()=>{
      setLoading(true);
        setBusinessList([]);
        const q=query(collection(db,'BusinessList'), where
        ('userEmail',"==",user?.primaryEmailAddress?.emailAddress));
        const querySnapShot = await getDocs(q);
        querySnapShot.forEach((doc)=>{
            setBusinessList(prev=>[...prev,{id:doc.id, ...doc.data()}])
        })
      setLoading(false);
    }

  return (
    <View style={{
        padding: 20
    }}>
      <Text style={{
        fontWeight: 700,
        fontSize: 30
      }}>My Business</Text>

      <FlatList 
        data={businnessList}
        onRefresh={GetUserBusiness}
        refreshing={loading}
        renderItem={({item, index})=>(
            <BusinessListCard 
                business={item}
                key={index}
            />
        )}
      />
    </View>
  )
}