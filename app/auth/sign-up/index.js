import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '../../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth} from './../../../configs/FirebaseConfig'


export default function SignUp() {
  const navigation=useNavigation();
  const router=useRouter();

  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const [username,setUserName]=useState();



  useEffect(()=>{
    navigation.setOptions({
      headerShown:false
    });

   
  },[]);


  const OnCreateAccount=()=>{

    if(!email&&!password&&!username)
    {
      ToastAndroid.show('Please enter all details',ToastAndroid.LONG);
      return ;
    }

    
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user);
    router.replace('/home')

    

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
     console.log("--",errorMessage,errorCode);
    // ..
  });
  }

  return (
    <View
    style={{
      padding:25,
      paddingTop:50,
      backgroundColor:Colors.WHITE,
      height:'100%'
    }}
    >
        <TouchableOpacity onPress={()=>router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:30,
        marginTop:30
      }}>Create New Account</Text>

      {/* Username  */}
    <View style={{
        marginTop:50
      }}>
        <Text style={{
          fontFamily:'outfit'
        }}>Username</Text>
        <TextInput
        style={styles.input}
         placeholder='Enter Username'
         onChangeText={(value)=>setUserName(value)}
         />
      </View>
         {/* Email  */}
      <View style={{
        marginTop:20
      }}>
        <Text style={{
          fontFamily:'outfit'
        }}>Email</Text>
        <TextInput
        style={styles.input}
        onChangeText={(value)=>setEmail(value)}
         placeholder='Enter Email' />
      </View>
      {/* Password  */}
      <View style={{
        marginTop:20
      }}>
        <Text style={{
          fontFamily:'outfit'
        }}>Password</Text>
        <TextInput
        secureTextEntry={true}
        style={styles.input}
        onChangeText={(value)=>setPassword(value)}
         placeholder='Enter Password' />
      </View>

         {/* Sign In Button  */}
         <TouchableOpacity onPress={OnCreateAccount} style={{
        padding:20,
        backgroundColor:Colors.PRIMARY,
        borderRadius:15,
        marginTop:50
      }}>
          <Text style={{
            color:Colors.WHITE,
            textAlign:'center'
          }}>Create Account</Text>
      </TouchableOpacity>

        {/* Create Account Button  */}
        <TouchableOpacity
          onPress={()=>router.replace('auth/sign-in')}
        style={{
        padding:20,
        backgroundColor:Colors.WHITE,
        borderRadius:15,
        marginTop:20,
        borderWidth:1
      }}>
          <Text style={{
            color:Colors.PRIMARY,
            textAlign:'center'
          }}>Sign In</Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  input:{
    padding:15,
    borderWidth:1,
    borderRadius:15,
    borderColor:Colors.GRAY,
    fontFamily:'outfit'
}
})