import { 
  View, Text, Image, TouchableOpacity, TextInput, ToastAndroid, ActivityIndicator 
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import { Colors } from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { collection, getDocs, query, setDoc, doc } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../configs/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';

export default function AddBusiness() {
  const navigation = useNavigation();
  const [images, setImages] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [about, setAbout] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const user = useUser();

  useEffect(() => {
      navigation.setOptions({
          headerTitle: 'Add New Business',
          headerShown: true,
      });
      GetCategoryList();
  }, []);

  const onImagePick = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 1,
      });
      if (!result.canceled) {
          setImages(result.assets[0].uri);
      }
  };

  const GetCategoryList = async () => {
      const q = query(collection(db, 'Category'));
      const snapShot = await getDocs(q);
      const categories = snapShot.docs.map(doc => ({
          label: doc.data().name,
          value: doc.data().name
      }));
      setCategoryList(categories);
  };

  const onAddNewBusiness = async () => {
      if (!images || !name || !address || !contact || !selectedCategory) {
          ToastAndroid.show('Please fill in all required fields', ToastAndroid.BOTTOM);
          return;
      }

      try {
          setLoading(true);
          const fileName = Date.now().toString() + ".jpg";
          const response = await fetch(images);
          const blob = await response.blob();
          const imageRef = ref(storage, `business-app/${fileName}`);

          await uploadBytes(imageRef, blob);
          const downloadUrl = await getDownloadURL(imageRef);
          
          await onSaveBusiness(downloadUrl);
      } catch (error) {
          console.error("Error uploading image: ", error);
          ToastAndroid.show('Failed to upload image', ToastAndroid.BOTTOM);
      } finally {
          setLoading(false);
      }
  };

  const onSaveBusiness = async (imageUrl) => {
      try {
          await setDoc(doc(db, 'BusinessDetail', Date.now().toString()), {
              name,
              address,
              contact,
              about,
              website,
              category: selectedCategory,
              username: user?.fullName,
              userEmail: user?.primaryEmailAddress?.emailAddress,
              userImage: user?.imageUrl,
              imageUrl
          });

          ToastAndroid.show('New Business Added...', ToastAndroid.BOTTOM);
          navigation.goBack();
      } catch (error) {
          console.error("Error saving business details: ", error);
          ToastAndroid.show('Failed to save business details', ToastAndroid.BOTTOM);
      }
  };

  return (
      <View style={{ padding: 20 }}>
          <Text style={{ fontWeight: '700', fontSize: 25 }}>Add New Business</Text>
          <Text style={{ color: Colors.GRAY }}>Fill all the details in order to add a new business</Text>

          <TouchableOpacity style={{ marginTop: 20 }} onPress={onImagePick}>
              {!images ? (
                  <Image source={require('../../assets/images/placeholder.png')} style={{ width: 100, height: 100 }} />
              ) : (
                  <Image source={{ uri: images }} style={{ width: 100, height: 100, borderRadius: 10 }} />
              )}
          </TouchableOpacity>

          <View>
              <TextInput
                  placeholder="Name"
                  value={name}
                  onChangeText={setName}
                  style={styles.input}
              />
              <TextInput
                  placeholder="Address"
                  value={address}
                  onChangeText={setAddress}
                  style={styles.input}
              />
              <TextInput
                  placeholder="Contact"
                  value={contact}
                  onChangeText={setContact}
                  keyboardType="phone-pad"
                  style={styles.input}
              />
              <TextInput
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  style={styles.input}
              />
              <TextInput
                  placeholder="Website"
                  value={website}
                  onChangeText={setWebsite}
                  keyboardType="url"
                  style={styles.input}
              />
              <TextInput
                  placeholder="About"
                  value={about}
                  onChangeText={setAbout}
                  multiline
                  numberOfLines={5}
                  style={[styles.input, { height: 100 }]}
              />

              <View style={styles.pickerContainer}>
                  <Picker
                      selectedValue={selectedCategory}
                      onValueChange={(value) => setSelectedCategory(value)}
                  >
                      <Picker.Item label="Select Category" value="" />
                      {categoryList.map((category, index) => (
                          <Picker.Item key={index} label={category.label} value={category.value} />
                      ))}
                  </Picker>
              </View>
          </View>

          <TouchableOpacity 
              disabled={loading}
              style={styles.button}
              onPress={onAddNewBusiness}
          >
              {loading ? (
                  <ActivityIndicator size={'large'} color={'#fff'} />
              ) : (
                  <Text style={styles.buttonText}>Add New Business</Text>
              )}
          </TouchableOpacity>
      </View>
  );
}

const styles = {
  input: {
      padding: 10,
      borderWidth: 1,
      borderRadius: 5,
      fontSize: 17,
      backgroundColor: '#fff',
      marginTop: 10,
      borderColor: Colors.PRIMARY,
  },
  pickerContainer: {
      borderWidth: 1,
      borderRadius: 5,
      fontSize: 17,
      backgroundColor: '#fff',
      marginTop: 10,
  },
  button: {
      padding: 15,
      backgroundColor: Colors.PRIMARY,
      borderRadius: 5,
      marginTop: 20,
  },
  buttonText: {
      textAlign: 'center',
      color: '#fff',
      fontSize: 17,
      fontWeight: 'bold',
  },
};
