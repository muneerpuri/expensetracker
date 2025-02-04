import React, { useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { addUserInfo } from '../store/reducer/reducer';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import LinearGradient from 'react-native-linear-gradient'; 

function Auth() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.general.user);
  const navigation = useNavigation()
  async function onGoogleButtonPress() {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      
      // Get the user's ID token
      const signInResult = await GoogleSignin.signIn();
      console.log(signInResult);
      
      // Get the ID token
      let idToken = signInResult.data?.idToken;
      if (!idToken) {
        idToken = signInResult.idToken;
      }
      if (!idToken) {
        throw new Error('No ID token found');
      }

      // Create a Google credential
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in with credential
      const userInfo = await auth().signInWithCredential(googleCredential);
      const { uid, email, displayName } = userInfo?.user;
      dispatch(addUserInfo({ uid, email, displayName }));
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '314884095438-ump53rt3j3o862ekqj8bs2qohihg3me7.apps.googleusercontent.com',
    });
  }, []);

  useFocusEffect(() => {
    checkIfUserIsLoggedIn();
  });

  async function checkIfUserIsLoggedIn() {
    try {
      const user = await auth().currentUser;
      if (user) {
        navigation.navigate("Categories")
        const { uid, email, displayName } = user;
        dispatch(addUserInfo({ uid, email, displayName }));
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <LinearGradient
      colors={['#6a11cb', '#2575fc']} // Beautiful purple to blue gradient
      style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Spendology</Text>
        <Text style={styles.subtitle}>Your Financial Journey Starts Here</Text>



        <TouchableOpacity onPress={() => onGoogleButtonPress()} style={styles.googleButton}>
          <Icon name="google" size={24} color="#fff" style={styles.googleIcon} />
          <Text style={styles.googleButtonText}>Sign in with Google</Text>
        </TouchableOpacity>

      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  container: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 20,
  },
  googleButton: {
    flexDirection: 'row',
    backgroundColor: '#db4437',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  googleIcon: {
    marginRight: 10,
  },
  googleButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Auth;
