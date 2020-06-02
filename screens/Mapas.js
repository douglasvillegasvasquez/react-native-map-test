import React, { Component } from "react";
import { connect } from 'react-redux'
import Firebase from '../config/Firebase'
import {
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  View,
  Image,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
//import Data from "../data";
import MapView , { Marker, PROVIDER_GOOGLE }from "react-native-maps";
import Icon from "react-native-vector-icons/Ionicons";

const { width, height } = Dimensions.get("window");

const MAP_HEIGHT = height * 0.85;
const CARD_HEIGHT = height - MAP_HEIGHT - 90;
const CARD_WIDTH = 100;
const ACCENT_COLOUR = "#ffa";

class Mapas extends Component {
  scrollerRef = null;

  

  constructor(props) {
    super(props);
    this.state = {
        isLoading:true,
        ready: false,
      where: {lat:null, lng:null},
         
    }
}

async componentDidMount() {
    
  let geoOptions ={ 
    enableHighAccuracy:true,
    timeOut:20,
    maximunAge: 60 * 60 * 24
  }

  this.setState({ready:false});
  navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoFailure,
    geoOptions);
 
  
}

geoSuccess = (position) => {


      this.setState({
        ready:true,
        where: {lat:position.coords.latitude, lng:position.coords.longitude}
      })
  }
componentDidMount () {
    return fetch(`https://infocitypi.firebaseio.com/marker.json`)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        donors: Object.values(responseJson),
//            donors: Object.values(responseJson),
      });
    })
    .catch((error) => {
      console.error(error);
    });   

    
}
initialState = {
    latitude:-23.563571,
    longitude:-46.685703,
    latitudeDelta:0.05 * 1.5,
    longitudeDelta:0.04 * 1.5,
}


render() {
    if(this.state.isLoading){
        return(
            <View style={styles.container}>
                <ActivityIndicator/>
            </View>
            
        )
    }else{
   
       
    let props = this.props;
   
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
            initialRegion={{
              latitude: -23.4687591,
              longitude: -46.6631621,
              latitudeDelta: 0.04,
              longitudeDelta:0.05,
            }}
                          
            region={props.region} style={styles.map}>
                {
                    props.source ?
                    this.markers(props.source, 0): null
                }
                {
                    props.destination ?
                    this.markers(props.destination, 1): null
                }
                {this.state.donors.map((item, index) =><Marker
                key={index}  
                coordinate={{
                latitude:parseFloat(item.latitude),
                longitude:parseFloat(item.longitude)
                 }}
                
        title={ item.user + " digitou"}
        description={item.name}
        
/>   
                )}      
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
          {this.state.donors.map((item, index) =>(
            <View
              key={index}
              style={{ width: CARD_WIDTH, marginHorizontal: 5 }}
            >
              
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingTop: 4
                }}
              >
              </View>
              <Text
                style={{ fontSize: 12, fontWeight: "bold", marginBottom: 4 }}
              >
                {item.name}
              </Text>
              <Text
                style={{ fontSize: 10, fontWeight: "bold", marginBottom: 4 }}
              >
                {'Coordenadas: ' + item.latitude + ', ' + item.longitude}
              </Text>
              <Button color="orange" title="Abrir dialogo" onPress={() => this.props.navigation.navigate('Teste')}></Button>
           
            </View>
          ))}
        </ScrollView>
      </View>
    );
    }//fim else
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
  button:{
   
    marginBottom:20,
    borderRadius:30
  },
})
const mapStateToProps = state => {
  return {
      user: state.user
  }
}

export default connect(mapStateToProps)(Mapas)