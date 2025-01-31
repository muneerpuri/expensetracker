import React, {useEffect} from 'react';
import {Text, View, Button} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useDispatch,useSelector} from 'react-redux';
import { addUserInfo } from '../store/reducer/reducer';

function Auth() {
  const dispatch = useDispatch();
  const user = useSelector(state=>state.general.user)

  async function onGoogleButtonPress() {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const signInResult = await GoogleSignin.signIn();
      console.log(signInResult);
      // Try the new style of google-sign in result, from v13+ of that module
      idToken = signInResult.data?.idToken;
      if (!idToken) {
        // if you are using older versions of google-signin, try old style result
        idToken = signInResult.idToken;
      }
      if (!idToken) {
        throw new Error('No ID token found');
      }

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(
        signInResult.data.idToken,
      );

      const userInfo = await auth().signInWithCredential(googleCredential);
      const {uid,email,displayName} = userInfo?.user
      dispatch(addUserInfo({uid,email,displayName}));
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '314884095438-ump53rt3j3o862ekqj8bs2qohihg3me7.apps.googleusercontent.com',
    });
  }, []);

  useEffect(()=>{
    checkIfUserIsLoggedIn()
  },[])

  async function checkIfUserIsLoggedIn(){
    try{
      const user = await auth().currentUser;
      console.log(user,"user")
      if(user){
        const {uid,email,displayName} = user
      dispatch(addUserInfo({uid,email,displayName}));
      }

    }catch(e){
      console.log(e)
    }
  }

  return (
    <View>
      <Text style={{color: 'black', padding: 20}}>heello</Text>
      <Button title="Google Sign-In" onPress={() => onGoogleButtonPress()} />
        <Text>{JSON.stringify(user)}</Text>
    </View>
  );
}

export default Auth;
