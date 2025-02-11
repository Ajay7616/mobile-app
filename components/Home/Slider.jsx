import { View, Text, FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';

export default function Slider() {
  const [sliderList, setSliderList] = useState([]);

  useEffect(() => {
    GetSliderList();
  }, []);

  const GetSliderList = async () => {
    try {
      const q = query(collection(db, 'Slider'));
      const querySnapshot = await getDocs(q);

      const sliderData = [];
      querySnapshot.forEach((doc) => {
        sliderData.push(doc.data());
      });

      setSliderList(sliderData);
    } catch (error) {
      console.error('Error fetching slider list:', error);
    }
  };

  return (
    <View>
      <Text style={{
        fontWeight: '700',
        fontSize: 20,
        paddingLeft: 20,
        paddingTop: 25
      }}>
        #Special For you
      </Text>

      <FlatList
        data={sliderList}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
        style={{paddingLeft: 20}}
        renderItem={({ item, index }) => (
          <Image 
            source={{ uri: item.imageUrl }} 
            style={{
              width: 300,
              height: 160,
              borderRadius: 15,
              marginRight: 20
            }} 
          />
        )}
      />
    </View>
  );
}
