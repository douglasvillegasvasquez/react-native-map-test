
import React from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import Profile from '../screens/Profile'
import GeoLocalizacao from '../screens/GeoLocalizacao'
import MessagesScreen from '../screens/MessagesScreen'
import SavedScreen from '../screens/SavedScreen'
import Mapa from '../screens/Mapa'
import Pegar from '../screens/Pegar'
import Pegar2 from '../screens/Pegar2'
import Teste from '../screens/Teste'
  

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
       
        GeoLocalizacao: {
            screen: GeoLocalizacao
        },
        MessagesScreen: {
            screen: MessagesScreen
        },
        SavedScreen: {
            screen: SavedScreen
        },
        Mapa: {
            screen: Mapa
        },
        Teste: {
            screen: Teste
        },
        Pegar: {
            screen: Pegar
        },
        Pegar2: {
            screen: Pegar2
        }


    },
    {
        initialRouteName: 'Login'
    }
)

export default createAppContainer(SwitchNavigator)
