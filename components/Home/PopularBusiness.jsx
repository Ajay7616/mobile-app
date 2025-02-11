import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { Colors } from '@/constants/Colors';
import { db } from '../../configs/FirebaseConfig';
import PopularBusinessCard from '../Home/PopularBusinessCard'

export default function PopularBusiness() {
    const [businessList, setBusinessList] = useState([]);
    
      useEffect(() => {
        GetBusinessList();
      }, []);
    
      const GetBusinessList = async () => {
        try {
          setBusinessList([])
          const q = query(collection(db, 'BusinessList'), limit(10));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            setBusinessList(prev=>[...prev,{id:doc?.id, ...doc.data()}]);
        });
        } catch (error) {
          console.error('Error fetching business list:', error);
        }
      };

  return (
    <View>
        <View
            style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: 20,
            marginBottom: 20,
            marginTop: 20
            }}
        >
            <Text style={{ fontSize: 20, fontWeight: '600' }}>Popular Business</Text>
            <Text style={{ color: Colors.PRIMARY }}>View all</Text>
        </View>

        <FlatList
            data={businessList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index})=> (
                <PopularBusinessCard
                    key={index}
                    business={item}
                />
            )}
        />
    </View>
  )
}