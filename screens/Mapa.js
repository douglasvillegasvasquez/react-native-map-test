import React, { Component } from "react";
import {
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  View,
  Image,
  Text,
  Platform,
  Animated,
  StyleSheet,
} from "react-native";
import MapView , { PROVIDER_GOOGLE }from "react-native-maps";
import Icon from "react-native-vector-icons/Ionicons";

const { width, height } = Dimensions.get("window");

const MAP_HEIGHT = height * 0.85;
const CARD_HEIGHT = height - MAP_HEIGHT - 90;
const CARD_WIDTH = 100;
const ACCENT_COLOUR = "#ffa";

export default class App extends Component {
  scrollerRef = null;

  state = {
    properties: [
      {
        id: 1,
        title: "USJT",
        nickname: "Abrir Chat",
        
        
        coords: {
          latitude: -23.568993,
          longitude: -46.71379
        }
      },
      {
        id: 2,
        title: "Faria Lima",
        nickname: "Abrir Chat",
       
         coords: {
          latitude: -23.567256,
          longitude: -46.693959
        }
      },
      {
        id: 3,
        title: "Pinheiros",
        nickname: "abrir Chat",
        
        coords: {
          latitude: -23.566425,
          longitude: -46.703054
        }
      },
      {
        id: 4,
        title: "Paulista",
        nickname: "Abrir Chat",
      
        coords: {
          latitude: -23.55858,
          longitude: -46.659353
        }
      },
      {
        id: 5,
        title: "Cachoeirinha",
        nickname: "Abrir Chat",
        
         coords: {
          latitude: -23.4689,
          longitude: -46.663421
        }
      }
    ],
    selectedProperty: 0
  };

  
  constructor(props) {
    super(props);
}
initialState = {
    latitude:null,
    longitude:null,
    latitudeDelta:0.00952 * 1.5,
    longitudeDelta:0.00421 * 1.5,
}


render() {
    let props = this.props;
    const { properties, selectedProperty } = this.state;

    return (
      // The marginTop here is used to move the map above where the navigation would be
      <View style={{ flex: 1, marginTop: -60 }}>
        <MapView provider={PROVIDER_GOOGLE}
            showsTraffic={true}
            showsIndoors={true}
            mapType="standard"
            followsUserLocation={true}
            provider={PROVIDER_GOOGLE}
            style={{flex:1}}
            showsUserLocation
            initialRegion={this.setState.initialState}
                          
                region={props.region} style={styles.map}>
                {
                    props.source ?
                    this.markers(props.source, 0): null
                }
                {
                    props.destination ?
                    this.markers(props.destination, 1): null
                }
                {
                      
                }
           
      
          {properties.map((property, index) => (
            <MapView.Marker key={property.id} coordinate={property.coords}>

              <View
                style={{
                  backgroundColor:
                    selectedProperty === index ? ACCENT_COLOUR : "#FF00",
                  height: 25,
                  width: 35,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius:3,
                  borderBottomWidth: 1
                }}
              >
               <Text
                style={{ fontSize: 5, fontWeight: "bold", marginBottom: 4 }}
              >
                {property.title}
              </Text>
              </View>
            </MapView.Marker>
          ))}
        </MapView>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          ref={ref => (this.scrollerRef = ref)}
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
          {properties.map((property, index) => (
            <View
              key={property.id}
              style={{ width: CARD_WIDTH, marginHorizontal: 5 }}
            >
              
              {selectedProperty === index && (
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: 4,
                    width: "100%",
                    backgroundColor: ACCENT_COLOUR
                  }}
                />
              )}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingTop: 4
                }}
              >
                

              

                
              </View>
              <Text
                style={{ fontSize: 15, fontWeight: "bold", marginBottom: 4 }}
              >
                {property.title}
              </Text>
             
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  map: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      position: 'absolute',
      
  },
})