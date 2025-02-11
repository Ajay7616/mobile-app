import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import BusinessListCard from '../../components/BusinessList/BusinessListCard';
import { Colors } from '@/constants/Colors';
import { db } from '../../configs/FirebaseConfig';

export default function BusinessListByCategory() {
    const navigation = useNavigation();
    const { category } = useLocalSearchParams();
    const [loading, setLoading] = useState(false); 
    const [businessList, setBusinessList] = useState([]);

    useEffect(() => {
        getBusinessList();
    }, [category]);

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: category
        });
    }, [category]);

    const getBusinessList = async () => {
      setLoading(true);
      try {
          const q = query(collection(db, 'BusinessList'), where("category", '==', category));
          const querySnapshot = await getDocs(q);
  
          const uniqueBusinesses = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
          }));
  
          // Set the entire unique list at once
          setBusinessList(uniqueBusinesses);
      } catch (error) {
          console.error('Error fetching business list:', error);
      }
      setLoading(false);
  };
  

    return (
        <View>
            {businessList.length > 0 && !loading ? (
                <FlatList 
                    data={businessList}
                    onRefresh={getBusinessList}
                    refreshing={loading}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <BusinessListCard business={item} />}
                />
            ) : loading ? (
                <ActivityIndicator
                    style={{ marginTop: '60%' }}
                    size={'large'}
                    color={Colors.PRIMARY}
                />
            ) : (
                <Text style={{
                    fontSize: 20,
                    color: Colors.GRAY,
                    textAlign: 'center',
                    marginTop: '50%'
                }}>
                    No Business Found
                </Text>
            )}
        </View>
    );
}
