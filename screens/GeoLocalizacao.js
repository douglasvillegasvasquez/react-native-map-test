import React, { Component, useState, useEffect } from "react";
//import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  View,
  Image,
  Text,
  Button,
  Platform,
  Animated,
  ActivityIndicator,
  
} from "react-native";
import cores from '../cores/cores'
import Data from "../data";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Icon from "react-native-vector-icons/Ionicons";
//latitudeDelta:0.0922,
//longitudeDelta:0.0421,
const { width, height } = Dimensions.get("window");

const MAP_HEIGHT = height * 0.85;
const CARD_HEIGHT = height - MAP_HEIGHT - 90;
const CARD_WIDTH = 200;
const ACCENT_COLOUR = "#008489";

const initialState = {
    latitude:null,
    longitude:null,
    latitudeDelta:0.00952 * 1.5,
    longitudeDelta:0.00421 * 1.5,
}

const App =({navigation}) => {
    const [curentPosition, setCurentPosition] = useState(initialState);
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const{longitude,latitude} = position.coords;
            setCurentPosition({
                ...curentPosition,
                latitude,
                longitude,
            }) 
        },
        error => alert(error.message),
        {timeout:20000, maximumAge:1000}

        )

    }, [])
    

    
    return curentPosition.latitude ? (
        
<View style={{flex:1}}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{flex:0.87}}
        showsUserLocation
        initialRegion={curentPosition}
        >     
     
{Data.map(post => (
 <Marker
        key={post.id}  
        coordinate={{
            latitude: post.lat,
            longitude: post.lng
        }}
        id={post.id}
        title={post.title}
        description={post.nickname}
       
         />

     
   
  ))}

        </MapView>
       
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            paddingTop: 20,
            paddingBottom: 10,
            backgroundColor: "#FFFFFF"
          }}
          contentContainerStyle={{
            paddingRight: 40,
            paddingLeft: 20
          }}

        >
          {Data.map(post => (
            <View key={post.id} style={{ width: CARD_WIDTH, marginHorizontal: 5 }} >
              
              <View style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingTop: 4
                }}>                
              </View>
              <Text style={{ fontSize: 15, fontWeight: "bold", marginBottom: 4 }} >
                {post.title}
              </Text>
             <Button title={post.nickname} onPress={() => navigation.navigate('Mensagens')}></Button>
            </View>
          ))}
        </ScrollView>

 
        </View>  
    ) : <ActivityIndicator style={{flex:1}} animating size="large"/>
};

export default App;
