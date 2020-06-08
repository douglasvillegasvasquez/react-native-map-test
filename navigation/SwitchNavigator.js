
import React from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import Profile from '../screens/Profile'
import SavedScreen from '../screens/SavedScreen'
import Mapas from '../screens/Mapas'
import MessagesScreen from '../screens/MessagesScreen'
  

const SwitchNavigator = createSwitchNavigator(
    {
        Login: {
            screen: Login
        },
        Signup: {
            screen: Signup
        },
        Profile: {
            screen: Profile
        },
       
        SavedScreen: {
            screen: SavedScreen
        },

        Mapas: {
            screen: Mapas
        },
        MessagesScreen: {
            screen: MessagesScreen
        },
  
        


    },
    {
        initialRouteName: 'Login'
    }
)

export default createAppContainer(SwitchNavigator)
