import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router'

export default function Login() {

    const router=useRouter();
  return (
    <View>
        <Image source={require('./../assets/images/login.png')}
            style={{
                width:'100%',
                height:520
            }}
        />
        <View style={styles.container}>
            <Text style={{
                fontSize:30,
                fontFamily:'outfit-bold',
                textAlign:'center',
                marginTop:10
            }}>Build Sustainable Habits with Grabits!</Text>

            <Text style={{
                fontFamily:'outfit',
                fontSize:17,
                textAlign:'center',
               color:Colors.GRAY,
               marginTop:20,
               marginBottom: -50,
            }}>Embrace a sustainable lifestyle with our gamified habit tracker. Choose daily eco-friendly habits, track your progress, and earn achievements and badges along the way. Make positive changes for yourself and the planet, one habit at a time.</Text>
       
            <TouchableOpacity style={styles.button}
                onPress={()=>router.push('auth/sign-in')}
            >
                <Text style={{color:Colors.WHITE,
                textAlign:'center',
                fontFamily:'outfit',
                fontSize:17
                }}>Get Started</Text>
            </TouchableOpacity>
    
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:Colors.WHITE,
        marginTop:-20,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        height:'100%',
        padding:25
    },
    button:{
        padding:15,
        backgroundColor:Colors.PRIMARY,
        borderRadius:99,
        marginTop:'20%'
    }
})