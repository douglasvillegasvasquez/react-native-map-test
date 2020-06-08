import React, { Component } from "react";

//import TabBarIcon from '../components/TabBarIcon';
import moment from 'moment';
import {
  YellowBox,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  View,
  Image,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
  Picker,
  TouchableOpacity,

  
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import MapView , { Marker, PROVIDER_GOOGLE }from "react-native-maps";
import { connect } from 'react-redux'
//import { Icon } from 'react-native-elements';
const { width, height } = Dimensions.get("window");

const MAP_HEIGHT = height * 0.85;
const CARD_HEIGHT = height - MAP_HEIGHT - 90;
const CARD_WIDTH = 120;
const CARD_WIDTHs = 150;

const ACCENT_COLOUR = "#ffa";

class Mapas extends Component {

 
  scrollerRef = null;
 

  constructor(props) {
    super(props);
    console.ignoredYellowBox = [
      'Setting a timer'
      ];
    this.state = {
        isLoading:true,
        ready: false,
        where: {lat:null, lng:null},
         
    }
}
async componentDidMount () {
  let geoOptions ={ 
    enableHighAccuracy:true,
    timeOut:2,
    maximunAge: 60 * 60 * 24
  }

  this.setState({ready:false});
  navigator.geolocation.getCurrentPosition(this.geoSuccess,
    geoOptions);
 
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
geoSuccess = (position) => {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  console.log("aqui foi no mapa")
  this.setState({
    ready:true,
    where: {lat:position.coords.latitude, lng:position.coords.longitude}
  })
}

//latitude:-23.563571,
//longitude:-46.685703,

onValueChange(value) {
  this.setState({
    group: value
  });
}

onValueChange2(value) {
  this.setState({
    grouptoBeFiltered: value
  });
}

_toggleDonorPost() {
  this.setState({
    isSubmited: false
  })
}


render() {
    if(this.state.isLoading){
        return(
            <View style={{top:"50%"}}>
                <ActivityIndicator/>
                <View
          
          style={{
            
            
             flexDirection:"row",
             bottom: 0,
            marginTop:"73.3%",
             left: 0,
             right: 0,
             paddingTop: 4,
             paddingBottom: 1,
             backgroundColor: "#FFFFfF"
           }}
           contentContainerStyle={{
             paddingRight: 20,
             paddingLeft: 20
           }}
 
         >
        
           <View style={{width:70,paddingLeft:20}}>
           <TouchableWithoutFeedback color="white" title="" onPress={() => this.props.navigation.navigate('Mapas')}>
           <Ionicons name="md-search" size={34} color="orange" >
           <Text style={styles.text}>         </Text>
           <Text style={styles.text}>Explorar</Text>
           </Ionicons>
           </TouchableWithoutFeedback>
           </View>
           
           <View style={{width:70,paddingLeft:10}}>
           <TouchableWithoutFeedback color="white" title="" onPress={() => this.props.navigation.navigate('SavedScreen')}>
           <Ionicons name="md-heart-empty" size={34} color="gray">
           <Text style={styles.text}>         </Text>
           <Text style={styles.text}>Salvos</Text>
           </Ionicons>
           </TouchableWithoutFeedback>
           </View>
           <View style={{width:90,paddingLeft:10}}>
           <Image source={require('../assets/images/logo.png')}
           style={styles.img}
           />
           </View>
           <View style={{width:70,paddingLeft:10}}>
           <TouchableWithoutFeedback color="white" title="" onPress={() => this.props.navigation.navigate('Teste')}>
           <Ionicons name="md-chatboxes" size={34} color="gray">
           <Text style={styles.text}>         </Text>
           <Text style={styles.text}>Mensagens</Text>
           </Ionicons>
           </TouchableWithoutFeedback>
           </View>
           <View style={{width:70,paddingLeft:10}}>
           <TouchableWithoutFeedback color="white" title="" onPress={() => this.props.navigation.navigate('Profile')}>
           <Ionicons style={styles.textview} name="md-person" size={34} color="gray">
           
           <Text style={styles.text}>         </Text>
           <Text style={styles.text}>Perfil</Text>
           </Ionicons>
           
           </TouchableWithoutFeedback>
            
           </View>
           
         </View>
      
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
            showsUserLocation={true}
            showsMyLocationButton={true}
            initialRegion={{
              latitude: this.state.where.lat,
              longitude:this.state.where.lng,
              latitudeDelta: 0.04,
              longitudeDelta:0.05,
            }}
                          
            region={props.region} style={styles.map}>
 {this.state.grouptoBeFiltered == null || this.state.grouptoBeFiltered == "null"
          ? 
<View>
{this.state.donors.map((item, index) =>
                <Marker
                key={index}  
                coordinate={{
                latitude:parseFloat(item.latitude),
                longitude:parseFloat(item.longitude)
                 }}
                 title={ item.user + " digitou as " + moment(new Date(item.myDate)).format("HH:m") +" " + moment(new Date(item.myDate)).format("DD/MM/YYYY")}
        description={item.name}

                 >
        {item.group == "Alagamento" ? <Image source={require('../assets/images/Alagamento.png')}
          style={styles.img}
        />:null
        
        }
        {item.group == "Incendio" ? <Image source={require('../assets/images/incendio.png')}
          style={styles.img}
        />:null
        
        }
        {item.group == "Protesto" ? <Image source={require('../assets/images/Protesto.png')}
          style={styles.img}
        />:null
        
        }
        {item.group == "Loja" ? <Image source={require('../assets/images/loja.png')}
          style={styles.img}
        />:null
        
        }
        {item.group == "Acidente" ? <Image source={require('../assets/images/AcidenteCarro.png')}
          style={styles.img}
        />:null
        
        }
        {item.group == "Transito" ? <Image source={require('../assets/images/Transito.png')}
          style={styles.img}
        />:null
        
        }
        {item.group == "Posto de gasolina" ? <Image source={require('../assets/images/posto.png')}
          style={styles.img}
        />:null
        
        }
        {item.group == "Farmacia" ? <Image source={require('../assets/images/farmacia.png')}
          style={styles.img}
        />:null
        
        }
        {item.group == "Ponto de Onibus" ? <Image source={require('../assets/images/onibus.png')}
          style={styles.img}
        />:null
        
        }  
        {item.group == "Mercado" ? <Image source={require('../assets/images/carrinho.png')}
          style={styles.img}
        />:null
        
        }  
                </Marker>
   
                )}
                </View>
:
<View>
                {this.state.donors.filter(element => element.group == this.state.grouptoBeFiltered).map((item, index) =>
                <Marker
                key={index}  
                coordinate={{
                latitude:parseFloat(item.latitude),
                longitude:parseFloat(item.longitude)
                 }}
        
        title={ item.user + " digitou as " + moment(new Date(item.myDate)).format("HH:m") +" " + moment(new Date(item.myDate)).format("DD/MM/YYYY")}
        description={item.group}>
        {item.group == "Alagamento" ? <Image source={require('../assets/images/Alagamento.png')}
          style={styles.img}
        />:null
        
        }
        {item.group == "Incendio" ? <Image source={require('../assets/images/incendio.png')}
          style={styles.img}
        />:null
        
        }
        {item.group == "Protesto" ? <Image source={require('../assets/images/Protesto.png')}
          style={styles.img}
        />:null
        
        }
        {item.group == "Loja" ? <Image source={require('../assets/images/loja.png')}
          style={styles.img}
        />:null
        
        }
        {item.group == "Acidente" ? <Image source={require('../assets/images/AcidenteCarro.png')}
          style={styles.img}
        />:null
        
        }
        {item.group == "Transito" ? <Image source={require('../assets/images/Transito.png')}
          style={styles.img}
        />:null
        
        }
        {item.group == "Posto de gasolina" ? <Image source={require('../assets/images/posto.png')}
          style={styles.img}
        />:null
        
        }
        {item.group == "Farmacia" ? <Image source={require('../assets/images/farmacia.png')}
          style={styles.img}
        />:null
        
        }
        {item.group == "Ponto de Onibus" ? <Image source={require('../assets/images/onibus.png')}
          style={styles.img}
        />:null
        
        }
        {item.group == "Mercado" ? <Image source={require('../assets/images/carrinho.png')}
          style={styles.img}
        />:null
        
        }    
        </Marker>
        
   
                )}
                </View> 
 }                   
        </MapView>
        <View
        style={{
            position: 'absolute',//use absolute position to show button on top of the map
            top: '10%', //for center align
            alignSelf: 'center', //for align to right
            padding:5,
            backgroundColor: "#fffafa",
            width:200,
            height:60,
            borderRadius:10,
            
        }}
    >
            <Picker
              selectedValue={(this.state.grouptoBeFiltered || this.state.pickerValue) || 'a'}
              onValueChange={this.onValueChange2.bind(this)}>
              <Picker.Item label="SELECIONE" value="null" />
              <Picker.Item label="Alagamento" value="Alagamento" />
              <Picker.Item label="Transito intenso" value="Transito intenso" />
              <Picker.Item label="Protesto" value="Protesto" />
              <Picker.Item label="Acidente" value="Acidente" />
              <Picker.Item label="Loja" value="Loja" />
              <Picker.Item label="Ponto de Onibus" value="Ponto de Onibus" />
              <Picker.Item label="Farmacia" value="Farmacia" />
              <Picker.Item label="Incendio" value="Incendio" />
              <Picker.Item label="Mercado" value="Mercado" />
              <Picker.Item label="Posto de gasolina" value="Posto de gasolina" />
              <Picker.Item label="Todos" value="null" />
            </Picker>
          
          </View>
          <View
        style={{
            position: 'absolute',//use absolute position to show button on top of the map
            top: '65%', //for center align
            alignSelf: 'flex-end', //for align to right
            padding:5,
            backgroundColor:"#ffffff94",
            
            borderRadius:30,
            
        }}
    >
         <TouchableWithoutFeedback  color="white" title="" onPress={() => this.props.navigation.navigate('MessagesScreen')}>
          
         <Ionicons name="ios-add-circle" size={38} color="red">
          </Ionicons>
          </TouchableWithoutFeedback>
          </View>
          
       
        
       
        {this.state.grouptoBeFiltered == null || this.state.grouptoBeFiltered == "null"
          ?
          <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTHs}
          ref={ref => (this.scrollerRef = ref)}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            paddingTop: 1,
            paddingBottom: 80,
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
              style={{ width: CARD_WIDTHs, marginHorizontal: 2 }}
            >
              
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingTop: 4,
                  
                }}
              >
              <Text
                style={{ fontSize: 12, fontWeight: "bold", marginBottom: 4 }}
              >
                {item.name}
              </Text>
            
              </View>
            <View style={{alignItems:"stretch",justifyContent:'flex-end',paddingTop:10}}>
            <Button color="orange" title="Ver" onPress={() => this.props.navigation.navigate('SavedScreen')}></Button>
           
            </View>
             
            </View>
         
          ))}
          </ScrollView>
:
<ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTHs}
          ref={ref => (this.scrollerRef = ref)}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            paddingTop: 1,
            paddingBottom: 80,
            backgroundColor: "#FFFFFF"
          }}
          contentContainerStyle={{
            paddingRight: 40,
            paddingLeft: 20
          }}

        >
          {this.state.donors.filter(element => element.group == this.state.grouptoBeFiltered).map((item, index) =>(
            <View
              key={index}
              style={{ width: CARD_WIDTHs, marginHorizontal: 2 }}
            >
              
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingTop: 4,
                  
                }}
              >
              <Text
                style={{ fontSize: 12, fontWeight: "bold", marginBottom: 4 }}
              >
                {item.name}
              </Text>
            
              </View>
            <View style={{alignItems:"stretch",justifyContent:'flex-end',paddingTop:10}}>
            <Button color="orange" title="Ver" onPress={() => this.props.navigation.navigate('SavedScreen')}></Button>
           
            </View>
             
            </View>
         
          ))}
          </ScrollView>
          
        }
     
       
        <View
          snapToInterval={CARD_WIDTH}
          ref={ref => (this.scrollerRef = ref)}
          style={{
            flexDirection:"row",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            paddingTop: 4,
            paddingBottom: 1,
            backgroundColor: "#FFFFFF"
          }}
          contentContainerStyle={{
            paddingRight: 20,
            paddingLeft: 20
          }}

        >
       
          <View style={{width:70,paddingLeft:20}}>
          <TouchableWithoutFeedback color="white" title="" onPress={() => this.props.navigation.navigate('Mapas')}>
          <Ionicons name="md-search" size={34} color="orange" >
          <Text style={styles.text}>         </Text>
          <Text style={styles.text}>Explorar</Text>
          </Ionicons>
          </TouchableWithoutFeedback>
          </View>
          
          <View style={{width:70,paddingLeft:10}}>
          <TouchableWithoutFeedback color="white" title="" onPress={() => this.props.navigation.navigate('SavedScreen')}>
          <Ionicons name="md-heart-empty" size={34} color="gray">
          <Text style={styles.text}>         </Text>
          <Text style={styles.text}>Salvos</Text>
          </Ionicons>
          </TouchableWithoutFeedback>
          </View>
          <View style={{width:90,paddingLeft:10}}>
          <Image source={require('../assets/images/logo.png')}
          style={styles.img}
          />
          </View>
          <View style={{width:70,paddingLeft:10}}>
          <TouchableWithoutFeedback color="white" title="" onPress={() => this.props.navigation.navigate('MessagesScreen')}>
          <Ionicons name="md-chatboxes" size={34} color="gray">
          <Text style={styles.text}>         </Text>
          <Text style={styles.text}>Mensagens</Text>
          </Ionicons>
          </TouchableWithoutFeedback>
          </View>
          <View style={{width:70,paddingLeft:10}}>
          <TouchableWithoutFeedback color="white" title="" onPress={() => this.props.navigation.navigate('Profile')}>
          <Ionicons style={styles.textview} name="md-person" size={34} color="gray">
          
          <Text style={styles.text}>         </Text>
          <Text style={styles.text}>Perfil</Text>
          </Ionicons>
          
          </TouchableWithoutFeedback>
           
          </View>
          
        </View>
        
      </View>
    );
    }//fim else
  }
}
const styles = StyleSheet.create({
  locate:{
    padding:5,
    marginRight: 20,
  },
  map: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      position: 'absolute',
  },
  img:{
    marginTop:1,
    height:50,
    width:50,
  },
  button:{
   
    marginBottom:20,
    borderRadius:30
  },
  TouchableOpacityStyle: {
    position: 'absolute',
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 30,
  },

  text:{
    fontSize:8,
    alignContent:'center',
    alignItems:'center',
  },
  textview:{
  
    alignContent:'center',
    alignItems:'center',
  },
  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 35,
    height: 3,
    paddingTop:5
    
  },
})
const mapStateToProps = state => {
  return {
      user: state.user
  }
}

export default connect(mapStateToProps)(Mapas)
//<Ionicons name="md-person" size={28} color="gray"/>
          