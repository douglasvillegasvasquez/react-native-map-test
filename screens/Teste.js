import React, { Component } from "react";
import {YellowBox, View, TouchableOpacity,Image, Button, ScrollView,TouchableWithoutFeedback, TextInput, StyleSheet, Text, FlatList, Alert, Picker } from 'react-native';
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
    console.log("Aqui foi no Salvos")
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
      <ScrollView>

        

        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <View style={{ backgroundColor: "#fFF", marginTop: 10 }}>
            {this.state.isSubmited
              ?
              
              <View style={{ padding: 20 }}>
              <View style={styles.timeline}>
          <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FA0', }}>Acontecimento</Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000', }}>Selecione um topico</Text>
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
              <Picker.Item label="Aglomeracao" value="Aglomeracao" />
              <Picker.Item label="Farmacia" value="Farmacia" />
              <Picker.Item label="Incendio" value="Incendio" />
              <Picker.Item label="Mercado" value="Mercado" />
              <Picker.Item label="Posto de gasolina" value="Posto de gasolina" />
            </Picker>
          </View>

        </View>
        {this.state.grouptoBeFiltered == null
          ?
          null
          :
          
          <View style={{ padding: 10 }}>
           
            {this.state.donors.filter(element => element.group == this.state.grouptoBeFiltered).map((item, index) => (

<View style={{ flex: 1, paddingTop: 10 }}>

<View style={{width:20,paddingLeft:10}}>
       <Text> </Text>
</View>
  <View style={styles.box}>

    <Text style={{ fontSize: 13, fontWeight: 'bold' }} >{item.user} {moment(new Date(item.myDate)).format("DD/MM/YYYY")}</Text>
   
    <Text style={{ fontSize: 10, fontWeight: 'bold' }} >{item.name}</Text>
    <Text style={{ fontSize: 12 }} note numberOfLines={3}>Ponto de Referencia {item.referencia}</Text>
    <View></View>
    
  </View>



</View>

))}
          </View>
        }
                <TouchableOpacity onPress={() => this._toggleDonorPost()}>
                  <Text style={{ fontSize: 20, color: '#FA0' }}>Adicionar mais Ocorrencias</Text>
                </TouchableOpacity>
              </View>

              :

              <View style={{ paddingLeft: 10, paddingRight: 10, paddingBottom: 30 }}>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 40, marginBottom:10 }}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FA0', }}>Nova Ocorrencia</Text>
                </View>

                <View style={styles.picker2}>
                  <Picker
                    selectedValue={(this.state.group || this.state.pickerValue) || 'a'}
                    onValueChange={this.onValueChange.bind(this)}>
              <Picker.Item label="SELECIONE" value="null" />
              <Picker.Item label="Alagamento" value="Alagamento" />
              <Picker.Item label="Transito intenso" value="Transito intenso" />
              <Picker.Item label="Protesto" value="Protesto" />
              <Picker.Item label="Acidente" value="Acidente" />
              <Picker.Item label="Loja" value="Loja" />
              <Picker.Item label="Ponto de Onibus" value="Ponto de Onibus" />
              <Picker.Item label="Aglomeracao" value="Aglomeracao" />
              <Picker.Item label="Farmacia" value="Farmacia" />
              <Picker.Item label="Incendio" value="Incendio" />
              <Picker.Item label="Mercado" value="Mercado" />
              <Picker.Item label="Posto de gasolina" value="Posto de gasolina" />
                  </Picker>
                </View>

                <View rounded style={styles.input}>
                  <TextInput style={styles.input2} placeholder="O que houve"
                    onChangeText={input => this.setState({ name: input })}
                  />
                </View>

                <View rounded style={styles.input}>
                  <TextInput style={styles.input2} placeholder="Referencia ou nome do local"
                    onChangeText={input => this.setState({ referencia: input })}

                  />
                </View>
               

                <View style={styles.button}>
                  <TouchableOpacity>
                    <Button color="orange" title="Ok" onPress={() => this.addDonor(this.state.name, this.state.referencia, this.state.group)} />
                  </TouchableOpacity>
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
             backgroundColor: "#FFFFFF"
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
           <Ionicons name="md-chatboxes" size={34} color="orange">
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
    paddingBottom:5,
  },
  picker2: {
    borderWidth: 1,
    borderColor: '#848484',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 50,
    backgroundColor: "#fffafa",
    paddingBottom:5,
    shadowOpacity: 1
  },
  box: {
    backgroundColor: "#dcf8c6",
    padding: 10,
    marginRight: 30,
    marginLeft: 30,
    borderRadius: 10,
    alignItems: "flex-start",
    height: 'auto',
  },
  box2: {
    padding: 15,
    marginTop: 10,
    alignItems: "center",

  },
  img:{
    marginTop:1,
    height:50,
    width:50,
  },
  text:{
    fontSize:8,
    alignContent:'center',
    alignItems:'center',
  },
  timeline: {
    height: 200
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
/* <Image  source={require('../assets/images/car-crash-solid.png')}
          style={styles.img}
          />*/