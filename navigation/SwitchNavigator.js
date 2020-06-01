
import React from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import Profile from '../screens/Profile'
import GeoLocalizacao from '../screens/GeoLocalizacao'
import MessagesScreen from '../screens/MessagesScreen'
import SavedScreen from '../screens/SavedScreen'
import Mapa from '../screens/Mapa'
import Mapas from '../screens/Mapas'
import Pegar from '../screens/Pegar'
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
        Mapas: {
            screen: Mapas
        },
        Teste: {
            screen: Teste
        },
        Pegar: {
            screen: Pegar
        },
        


    },
    {
        initialRouteName: 'Login'
    }
)

export default createAppContainer(SwitchNavigator)
