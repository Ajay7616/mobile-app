import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { useWarmUpBrowser } from '../hooks/useWarmUpBrowser';
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from '@clerk/clerk-expo';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
    useWarmUpBrowser();

    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onPress = React.useCallback(async () => {
        try {
            const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();
            
            if (createdSessionId) {
                setActive({ session: createdSessionId });
            } else {
                console.log("No session created, handle flow accordingly.");
            }
        } catch (err) {
            console.error("OAuth error", err);
        }
    }, []);

    return (
        <View>
            <View style={styles.imageContainer}>
                <Image 
                    source={require('../assets/images/login.png')} 
                    style={styles.image}
                />
            </View>
            <View style={styles.subContainer}>
                <Text style={styles.titleText}>
                    Your Ultimate  
                    <Text style={styles.highlightedText}> Community Business Directory</Text> App
                </Text>
                <Text style={styles.subText}>
                    Find your favourite business near you and post your own business to your community
                </Text>
                <TouchableOpacity style={styles.btn} onPress={onPress}>
                    <Text style={styles.btnText}>Let's Get Started</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 100,
    },
    image: {
        width: 250,
        height: 450,
        borderRadius: 20,
        borderWidth: 6,
        borderColor: '#000',
    },
    subContainer: {
        backgroundColor: '#fff', 
        padding: 20,
        marginTop: -20,
    },
    titleText: {
        fontSize: 23,
        fontWeight: '600',
        textAlign: 'center',
    },
    highlightedText: {
        color: Colors.PRIMARY,
    },
    subText: {
        fontSize: 15,
        textAlign: 'center',
        marginVertical: 15,
        color: Colors.GRAY,
    },
    btn: {
        backgroundColor: Colors.PRIMARY,
        padding: 16,
        borderRadius: 99,
        marginTop: 20,
    },
    btnText: {
        textAlign: 'center',
        color: '#fff',
    },
});
