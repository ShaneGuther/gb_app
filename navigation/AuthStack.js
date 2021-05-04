import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import React, { Component} from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, StyleSheet, Text, View, SafeAreaView, Image, Platform, TextInput, TouchableOpacity} from 'react-native';
import { color } from 'react-native-reanimated';

//import firebase from '../api/fireBaseConfig'
import firebase from 'firebase';
import Home from './components/Home';
import Login from './components/Login';
import PastRounds from './components/PastRounds';
import AddRound from './components/AddRound';
import SignUp from './components/SignUp';

const Stack = createStackNavigator();
export default function AuthStack(){
    return(
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
            name='Login'
            component={Login}
            >

            </Stack.Screen>
        </Stack.Navigator>
    )
}