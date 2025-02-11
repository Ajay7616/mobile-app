import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '@/configs/FirebaseConfig';
import CategoryItem from '../Home/CategoryItem';
import { useRouter } from 'expo-router';

export default function Category({explore=false, onCategorySelect}) {
  const [categoryList, setCategoryList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    GetCategoryList();
  }, []);

  const GetCategoryList = async () => {
    try {
      const q = query(collection(db, 'Category'));
      const querySnapshot = await getDocs(q);
      const categoryData = [];
      querySnapshot.forEach((doc) => {
        categoryData.push(doc.data());
      });
      setCategoryList(categoryData);
    } catch (error) {
      console.error('Error fetching category list:', error);
    }
  };

  const onCategoryPressHandler=(item)=>{
    if(!explore)
    {
      router.push('/businesslist/'+item.name)
    } else {
      onCategorySelect(item.name)
    }
  }

  return (
    <View>
      {!explore && <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 20,
          marginTop: 10,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: '600' }}>Category</Text>
        <Text style={{ color: Colors.PRIMARY }}>View all</Text>
      </View>}
      <FlatList
        data={categoryList}
        horizontal={true}
        style={{marginLeft: 20}}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
            <CategoryItem 
                category={item}
                key={item}
                onCategoryPress={(category)=>
                  onCategoryPressHandler(item)
                }
            />
        )}
      />
    </View>
  );
}
