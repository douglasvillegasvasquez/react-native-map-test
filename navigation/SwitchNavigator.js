import React from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import Profile from '../screens/Profile'
import Teste from '../screens/Teste'
import GeoLocalizacao from '../screens/GeoLocalizacao'
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
        Teste: {
            screen: Teste
        },
        GeoLocalizacao:{
            screen:GeoLocalizacao
        }
    },
    {
        initialRouteName: 'Login'
    }
)

export default createAppContainer(SwitchNavigator)