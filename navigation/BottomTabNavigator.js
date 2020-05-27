import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import {
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  View,
  Image,
  Text,} from "react-native";

import TabBarIcon from '../components/TabBarIcon';
import GeoLocalizacao from '../screens/GeoLocalizacao';
import SettingsScreen from '../screens/SettingsScreen';
import SavedScreen from '../screens/SavedScreen';
import MessagesScreen from '../screens/MessagesScreen'
import Button from '../screens/Button';
const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  
  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Geolocalizacao"
        component={GeoLocalizacao}
        options={{
          title: 'GeoLocalizacao',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-map" />,
        }}
        
      />
      <BottomTab.Screen
        name="Salvos"
        component={SavedScreen}
        options={{
          title: 'Salvos',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-heart-empty" />,
        }}
        
      />
      <BottomTab.Screen
        name="a"
        component={GeoLocalizacao}
        options={{
          title: '',
          tabBarIcon: ({ focused }) => <Image source={require('../assets/images/logo.png')}
          style={styles.img}
          />,
        }}
      />
      <BottomTab.Screen
        name="Mensagens"
        component={MessagesScreen}
        options={{
          title: 'Mensagens',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-chatboxes" />,
        }}
        
      />
      <BottomTab.Screen
        name="Perfil"
        component={Button}
        options={{
          title: 'Perfil',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-person" />,
        }}
        
      />
      
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {

    case 'Geolocalizacao':
    return 'Explorar';
    case 'MapaTeste':
    return 'MapaTeste';
    case 'MapsClass':
    return 'Map2';
    case 'Button':
      return 'Adicionar novo Chat no Mapa';
    
  }
}

const styles = StyleSheet.create({
  
  img:{
    marginTop:15,
    height:45,
    width:45,
  },
});
