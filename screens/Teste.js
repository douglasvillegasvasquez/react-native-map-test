import React, { Component } from "react";
import { View,TouchableOpacity,Button,ScrollView,TextInput, StyleSheet,Text,FlatList, Alert, Picker } from 'react-native';
//import { List, ListItem,Container, Header, Content, Left, Right, Body, Title, Button,Item, Input,  } from "native-base";
//import Communications from 'react-native-communications';
import { Ionicons} from '@expo/vector-icons';
import Form from 'react-native-advanced-forms';
 
import { Font } from 'expo';
export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isSubmited: false,
      name: null,
      latitude: null,
      longitude: null,
      mobile: null,
      group: null,
      donors: [],
      grouptoBeFiltered: null,
      ready: false,
      where: {lat:null, lng:null},
      myDate: null
    };
  }

ShowCurrentDate = () => {
  var data = new Date()
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  Alert.alert(data + '; ' + date + '-' + month + '-' + year)
  this.setState({
    myDate: data
  })
  console.log(data + '; ' + date + '-' + month + '-' + year)
  console.log(myDate)
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
    this.timer=setInterval(() =>this.getDonor(), 1000);
    
  }
  

  geoSuccess = (position) => {
  
    console.log(position);
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
     
        this.setState({
          ready:true,
          where: {lat:position.coords.latitude, lng:position.coords.longitude}
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

  addDonor = (name, latitude, longitude, mobile, group) => {
    if(this.state.name != null && this.state.latitude != null && this.state.longitude != null && this.state.mobile != null && this.state.group != null){ 
      fetch('https://infocitypi.firebaseio.com/marker.json', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "name": name,
          "latitude": latitude,
          "longitude": longitude,
          "mobile": mobile,
          "group": group,
          
        }),
      })
      .then((response) => response.json())
      .then((responseData) => {
              if(responseData.name != null ){
                this.setState({
                    name: null,
                    latitude: null,
                    longitude: null,
                    mobile: null,
                    group: null,
                    isSubmited: true,
                   
                  })              
              }
              else{
              Alert.alert(
                'Oops !',
                'Algo deu errado ',
                [
                  {text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                ],
                { cancelable: false }
              )
            }

      })
      .done();
    }
      else{
        Alert.alert(
          'Oops !',
          'Preencha todos os campos',
          [
            {text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
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

    _toggleDonorPost(){
        this.setState({
            isSubmited: false
        })
    }

  render() {
    return (
      <ScrollView>

        <View style={{ backgroundColor: '#deea' }}>
          <View style = {{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
            <Text>Ocorrencias</Text>
          </View>
        </View>
  <View style={styles.timeline}>
          <View style = {{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop:20, marginBottom: 10 }}>
            <Text style = {{ fontSize:15, fontWeight: 'bold', color:'#FA0', }}>Acontecimento</Text>
          </View>
          
      <View style = { styles.picker }>
            <Picker
                selectedValue={ (this.state.grouptoBeFiltered && this.state.pickerValue) || 'a'}
                onValueChange={this.onValueChange2.bind(this)}>
                <Picker.Item label="-SELECIONE-" value="null" />
                <Picker.Item label="Alagamento" value="Alagamento" />
                      <Picker.Item label="Transito intenso" value="Transito intenso" />
                      <Picker.Item label="Protesto" value="Protesto" />
                      <Picker.Item label="Acidente" value="Acidente" />
                      <Picker.Item label="Loja aberta" value="Loja aberta" />
                      <Picker.Item label="Situacao Onibus" value="Situacao Onibus" />
                      <Picker.Item label="Aglomeracao" value="Aglomeracao" />
                      <Picker.Item label="Farmacia Aberta" value="Farmacia Aberta" />
                </Picker>
          </View>

        </View>
        {this.state.grouptoBeFiltered == null
        ?
        null
        :
        <View>
                {this.state.donors.filter( element => element.group ==this.state.grouptoBeFiltered).map((item, index) => (
                  
                  <View style={{flex:1}}>
                  <View style={styles.box}>
                <Text>{item.name} ({item.group}) </Text>
                   </View>   
                      <Text note numberOfLines={1}>Mob: {item.mobile}</Text>
                      <Text>{item.latitude} {item.longitude}</Text>
                 
                   
                     
                   </View>
                      
                ))}
        </View>
      }   
        <View style = {{ marginLeft: 10, marginRight:10 }}>
          <View style = {{ backgroundColor:"#fFF", marginTop: 10 }}>
          {this.state.isSubmited
          ? 
            <TouchableOpacity onPress = { () => this._toggleDonorPost()}>
              <Text style = {{ fontSize:20, color:'#770707' }}>Adicionar mais Ocorrencias</Text>
            </TouchableOpacity>
          :
            <View style = {{ paddingLeft: 20, paddingRight: 20, paddingBottom: 40  }}>
             <View style = {{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop:20 }}>
                <Text style = {{ fontSize:15, fontWeight: 'bold', color:'#e89494', }}>Nova Ocorrencia</Text>
              </View>

            <View style = { styles.picker }>
                <Picker
                    selectedValue={ (this.state.group && this.state.pickerValue) || 'a'}
                    onValueChange={this.onValueChange.bind(this)}>
                    <Picker.Item label="-SELECIONE-" value="null" />
                    <Picker.Item label="Alagamento" value="Alagamento" />
                      <Picker.Item label="Transito intenso" value="Transito intenso" />
                      <Picker.Item label="Protesto" value="Protesto" />
                      <Picker.Item label="Acidente" value="Acidente" />
                      <Picker.Item label="Loja aberta" value="Loja aberta" />
                      <Picker.Item label="Situacao Onibus" value="Situacao Onibus" />
                      <Picker.Item label="Aglomeracao" value="Aglomeracao" />
                      <Picker.Item label="Farmacia Aberta" value="Farmacia Aberta" />
               </Picker>
              </View>
             
              <View rounded style = {styles.input}>
                <TextInput placeholder="Name" 
                onChangeText={input => this.setState({ name: input })} 
                />
              </View>

              <View rounded style = {styles.input}>
                <TextInput placeholder="Mobile" 
                onChangeText={input => this.setState({ mobile: input })} 
                keyboardType = { "phone-pad" }
                />
              </View>
              <View rounded style = {styles.input}>
                <TextInput placeholder="Insira aqui a Latitude escrita abaixo" 
                onChangeText={input => this.setState({ latitude: input })} 
                keyboardType = { "phone-pad" }
                />
              </View>
              <Text>Sua Latitude {this.state.where.lat}</Text>
              
              <View rounded style = {styles.input}>
                <TextInput placeholder="Insira aqui a Longitude escrita abaixo" 
                onChangeText={input => this.setState({ longitude: input })} 
                keyboardType = { "phone-pad" }
                />
              </View>
              <Text>Sua Longitude {this.state.where.lng}</Text>
              <View style={styles.button}>
              <TouchableOpacity>
              <Button color="#ADF8"  title="Ok" onPress={ () => this.addDonor(this.state.name,this.state.latitude,this.state.longitude, this.state.mobile, this.state.group) } />
              </TouchableOpacity>
              </View>

              <View style={styles.button}>
              
              <Button color="#ADF8" title="Voltar para Perfil" onPress={() => this.props.navigation.navigate('Profile')} />         
              
              </View>
                          </View>
          }
        </View>

       
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
picker: {
  borderWidth:1,
  borderColor: '#848484',
  marginLeft: 60,
  marginRight: 60,
  marginBottom: 30,
  backgroundColor:"#ADF8"
},
box:{
  backgroundColor:"#ADD",
  padding:10,
  marginRight: 40,
  marginLeft:30,
  borderRadius: 10,
  alignItems:"flex-end",
  height: 60
},
timeline:{
  height:200
},
button:{
  backgroundColor:'#ADF8',
  color:"blue",
  marginBottom:20,
  borderRadius:30
},
input:{ marginBottom: 20, marginTop:20, borderBottomWidth: 1,backgroundColor:"#Feed",borderRadius:20 }
});