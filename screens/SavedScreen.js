import React, { Component } from "react";
import {YellowBox, View, TouchableOpacity,Image, Button, ScrollView, TextInput,TouchableWithoutFeedback, StyleSheet, Text, FlatList, Alert, Picker } from 'react-native';
//import { List, ListItem,Container, Header, Content, Left, Right, Body, Title, Button,Item, Input,  } from "native-base";
//import Communications from 'react-native-communications';
import { Ionicons } from '@expo/vector-icons';
import Form from 'react-native-advanced-forms';
import { connect } from 'react-redux';
import moment from 'moment';
import Icon from "react-native-vector-icons/Ionicons";
import { Font } from 'expo';
class Teste extends Component {
  construct() {
    YellowBox.ignoreWarnings(['Setting a timer']);
    YellowBox.ignoreWarnings(['perform a React state updae']);
  }
  constructor(props) {
    super(props);
    console.ignoredYellowBox = [
      'Setting a timer'
      ];
    this.state = {
      isSubmited: false,
      name: null,
      latitude: null,
      longitude: null,
      referencia: null,
      group: null,
      donors: [],
      grouptoBeFiltered: null,
      ready: false,
      where: { lat: null, lng: null },
      myDate: null
    };
  }
  state = {user: ''};
  updateUser = user => {
    this.setState({user: user});
  };

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state,callback)=>{
        return;
    };
}
  async componentDidMount() {

    let geoOptions = {
      enableHighAccuracy: true,
      timeOut: 20,
      maximunAge: 60 * 60 * 24
    }

    this.setState({ ready: false });
    navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoFailure,
      geoOptions);
    this.timer = setInterval(() => this.getDonor(), 1000);

  }


  geoSuccess = (position) => {



    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    console.log(("Aqui foi no Mensagens"))
    this.setState({
      ready: true,
      where: { lat: position.coords.latitude, lng: position.coords.longitude },

    })

  }


  async getDonor() {
    return fetch(`https://infocitypi.firebaseio.com/marker.json`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          donors: Object.values(responseJson),
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  addDonor = (name, referencia, group) => {
    if (this.state.name != null && this.state.referencia != null && this.state.group != null) {
      fetch('https://infocitypi.firebaseio.com/marker.json', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "name": name,
          "latitude": this.state.where.lat,
          "longitude": this.state.where.lng,
          "referencia": referencia,
          "group": group,
          "myDate": new Date(),
          "user": this.props.user.fullname,

        }),
      })
        .then((response) => response.json())
        .then((responseData) => {
          if (responseData.name != null) {
            this.setState({
              name: null,
              latitude: null,
              longitude: null,
              referencia: null,
              group: null,
              user: null,
              isSubmited: true,

            })
          }
          else {
            Alert.alert(
              'Oops !',
              'Algo deu errado ',
              [
                { text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
              ],
              { cancelable: false }
            )
          }

        })
        .done();
    }
    else {
      Alert.alert(
        'Oops !',
        'Preencha todos os campos',
        [
          { text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        ],
        { cancelable: false }
      )
    }

  };

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
    return (
      <View style={{flex:1}}>
      <ScrollView style={{ marginTop:40}}> 

      
        <View style={styles.timeline}>
          <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FA0', }}>Acontecimento</Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000', }}>Selecione um Acontecimento</Text>
          </View>
       

          <View style={styles.picker}>
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

        </View>
        {this.state.grouptoBeFiltered == null || this.state.grouptoBeFiltered == "null"
          ?   
<View style={{ padding: 2 }}>          
            {this.state.donors.map((item, index) => (
            <ScrollView style={{ flex: 1, paddingTop: 1 }}>
            <View style={styles.box} key={index}>
    <Text style={{ fontSize: 16, fontWeight: 'bold' }} >{item.user} {moment(new Date(item.myDate)).format("DD/MM/YYYY")}</Text>
    <Text style={{ fontSize: 16, fontWeight: 'bold' }} >{moment(new Date(item.myDate)).format("HH:m")}</Text>
    <Text style={{ fontSize: 14, fontWeight: 'bold' }} >{item.name}</Text>
    <Text style={{ fontSize: 14 }} note numberOfLines={3}>Ponto de Referencia {item.referencia}</Text>
  </View>



</ScrollView>

))}
          </View>  
          :  
          <View style={{ padding: 2 }}>          
            {this.state.donors.filter(element => element.group == this.state.grouptoBeFiltered).map((item, index) => (
            <ScrollView style={{ flex: 1, paddingTop: 1 }}>
              <View style={styles.box}>
    <Text style={{ fontSize: 16, fontWeight: 'bold' }} >{item.user} {moment(new Date(item.myDate)).format("DD/MM/YYYY")}</Text>
    <Text style={{ fontSize: 16, fontWeight: 'bold' }} >{moment(new Date(item.myDate)).format("HH:m")}</Text>
    <Text style={{ fontSize: 14, fontWeight: 'bold' }} >{item.name}</Text>
    <Text style={{ fontSize: 14 }} note numberOfLines={3}>Ponto de Referencia {item.referencia}</Text>
  </View>



</ScrollView>

))}
          </View>
        

        }
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <View style={{ backgroundColor: "#fFF", marginTop: 10, }}>
            {this.state.isSubmited
              ?

              <View style={{ padding: 20 }}>
                <TouchableOpacity onPress={() => this._toggleDonorPost()}>
                  <Text style={{ fontSize: 20, color: '#FA0' }}>Adicionar mais Ocorrencias</Text>
                </TouchableOpacity>
              </View>

              :

              <View style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 40 }}>
                

                

                <View style={styles.button}>

                  <Button color="orange" title="Voltar para Perfil" onPress={() => this.props.navigation.navigate('Profile')} />
     
                </View>
                <View style={styles.button}>

<Button color="orange" title="Explorar Mapa" onPress={() => this.props.navigation.navigate('Mapas')} />

</View>
              </View>
              
            }
          </View>
          

        </View>
       
         
      </ScrollView>
      <View
          
          style={{
            
            position:"absolute",
             flexDirection:"row",
             bottom: 0,
            marginTop:"62.2%",
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
           <Ionicons name="md-search" size={34} color="gray" >
           <Text style={styles.text}>         </Text>
           <Text style={styles.text}>Explorar</Text>
           </Ionicons>
           </TouchableWithoutFeedback>
           </View>
           
           <View style={{width:70,paddingLeft:10}}>
           <TouchableWithoutFeedback color="white" title="" onPress={() => this.props.navigation.navigate('SavedScreen')}>
           <Ionicons name="md-heart-empty" size={34} color="orange">
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
  }
}

const styles = StyleSheet.create({
  picker: {
    borderWidth: 1,
    borderColor: '#848484',
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 50,
    backgroundColor: "#fffafa",
    elevation: 1
  },
  box: {
    backgroundColor: "#fffafa",
    padding: 20,
    marginRight: 0,
    marginLeft: 0,
    borderRadius: 0,
    alignItems: "flex-start",
    height: 'auto',
  },
  box2: {
    padding: 1,
    marginTop: 0,
    alignItems: "center",

  },
  img:{
    marginTop:1,
    height:50,
    width:50,
  },
  timeline: {
    height: 'auto'
  },
  text:{
    fontSize:8,
    alignContent:'center',
    alignItems:'center',
  },
  button: {

    marginBottom: 20,
    borderRadius: 30
  },
  input: { marginBottom: 20, marginTop: 20, height: 35, borderBottomWidth: 1, backgroundColor: "#FFFAFA", borderRadius: 10 }
  , input2: {
    marginLeft: 9
  }
});
const mapStateToProps = state => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(Teste)

//selectedValue={(this.state.grouptoBeFiltered && this.state.pickerValue) || 'a'}
              
/* <Image  source={require('../assets/images/car-crash-solid.png')}
          style={styles.img}
          />*/
// import { Ionicons } from '@expo/vector-icons';
// import * as WebBrowser from 'expo-web-browser';
// import * as React from 'react';
// import { StyleSheet, Text, View ,Button} from 'react-native';
// import { RectButton, ScrollView } from 'react-native-gesture-handler';

// export default function SavedScreen({navigation}) {
//   return (
//     <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
//      <Button title="Voltar para Perfil" onPress={() => navigation.navigate('Profile')} />
//       <OptionButton
//         icon="md-chatboxes"
//         label="Chat Salvo"
//        />

//       <OptionButton
//         icon="md-chatboxes"
//         label="Chat"
        
//       />

//       <OptionButton
//         icon="ios-chatboxes"
//         label="Chat"
//         isLastOption
//       />
//     </ScrollView>
//   );
// }

// function OptionButton({ icon, label, onPress, isLastOption }) {
//   return (
//     <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
//       <View style={{ flexDirection: 'row' }}>
//         <View style={styles.optionIconContainer}>
//           <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
//         </View>
//         <View style={styles.optionTextContainer}>
//           <Text style={styles.optionText}>{label}</Text>
//         </View>
//       </View>
//     </RectButton>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fafafa',
//   },
//   contentContainer: {
//     paddingTop: 15,
//   },
//   optionIconContainer: {
//     marginRight: 12,
//   },
//   option: {
//     backgroundColor: '#fdfdfd',
//     paddingHorizontal: 15,
//     paddingVertical: 15,
//     borderWidth: StyleSheet.hairlineWidth,
//     borderBottomWidth: 0,
//     borderColor: '#ededed',
//   },
//   lastOption: {
//     borderBottomWidth: StyleSheet.hairlineWidth,
//   },
//   optionText: {
//     fontSize: 15,
//     alignSelf: 'flex-start',
//     marginTop: 1,
//   },
// });
