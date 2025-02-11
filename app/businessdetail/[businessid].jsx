import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import { Colors } from '../../constants/Colors';
import Intro from '../../components/BusinessDeatil/Intro';
import ActionButton from '../../components/BusinessDeatil/ActionButton';
import About from '../../components/BusinessDeatil/About';
import Reviews from '../../components/BusinessDeatil/Reviews';

export default function BusinessDetail() {

  const { businessid } = useLocalSearchParams();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetBusinessDetailById();
  }, []);

  const GetBusinessDetailById = async () => {
    try {
      setLoading(true);
      const docRef = doc(db, 'BusinessList', businessid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setBusiness({id:docSnap.id, ...docSnap.data()});
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching business detail: ", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ActivityIndicator
        style={{ marginTop: '70%' }}
        size="large"
        color={Colors.PRIMARY}
      />
    );
  }

  if (!business) {
    return (
      <Text style={{ marginTop: '70%', textAlign: 'center' }}>
        No business details found.
      </Text>
    );
  }

  // Data array for FlatList
  const data = [
    { key: 'intro', component: <Intro business={business} /> },
    { key: 'actionButton', component: <ActionButton business={business} /> },
    { key: 'about', component: <About business={business} /> },
    { key: 'review', component: <Reviews business={business} /> }
  ];

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <View>{item.component}</View>}
      keyExtractor={(item) => item.key}
    />
  );
}
