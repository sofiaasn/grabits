import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import {Colors} from './../../constants/Colors'


export default function TabLayout() {
  return (
    <Tabs screenOptions={{
        headerShown:false,
        tabBarActiveTintColor:Colors.PRIMARY
    }}>
        <Tabs.Screen name="home"
          options={{
            tabBarLabel:'Home',
            tabBarIcon:({color})=><Entypo name="home"
            size={24} color={color} />
          }}
        />
        <Tabs.Screen name="habits"
          options={{
            tabBarLabel:'Habits',
            tabBarIcon:({color})=><Ionicons name="information-circle-outline" 
            size={24} color={color} />          
          }}
        />
        
    </Tabs>
  )
}

