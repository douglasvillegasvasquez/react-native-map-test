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
    };
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
                'Something went wrong',
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
          'You forgot some field. Please fill it before submitting',
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

        <View style={{ backgroundColor: '#d11919' }}>
          <View style = {{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
            <Text>Ocorrencias</Text>
          </View>
        </View>

        <View style = {{ marginLeft: 10, marginRight:10 }}>
          <View style = {{ backgroundColor:"#f2eded", marginTop: 10 }}>
          {this.state.isSubmited
          ? 
            <TouchableOpacity onPress = { () => this._toggleDonorPost()}>
              <Text style = {{ fontSize:20, color:'#770707' }}>Adicionar mais Ocorrencias</Text>
            </TouchableOpacity>
          :
            <View style = {{ paddingLeft: 20, paddingRight: 20, paddingBottom: 40  }}>
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
              <View style = {{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop:20 }}>
                <Text style = {{ fontSize:15, fontWeight: 'bold', color:'#e89494', }}>Nova Ocorrencia</Text>
              </View>

              <View rounded style = {{ marginBottom: 20, marginTop:20 }}>
                <TextInput placeholder="Name" 
                onChangeText={input => this.setState({ name: input })} 
                />
              </View>

              <View rounded style = {{ marginBottom: 20, marginTop:20 }}>
                <TextInput placeholder="Mobile" 
                onChangeText={input => this.setState({ mobile: input })} 
                keyboardType = { "phone-pad" }
                />
              </View>
              <View rounded style = {{ marginBottom: 20, marginTop:20 }}>
                <TextInput placeholder="Insira aqui a Latitude escrita abaixo" 
                onChangeText={input => this.setState({ latitude: input })} 
                />
              </View>
              <Text>Sua Latitude {this.state.where.lat}</Text>
              
              <View rounded style = {{ marginBottom: 20, marginTop:20 }}>
                <TextInput placeholder="Insira aqui a Longitude escrita abaixo" 
                onChangeText={input => this.setState({ longitude: input })} 
                />
              </View>
              <Text>Sua Longitude {this.state.where.lng}</Text>
              
              

              <Button title="Ok" onPress={ () => this.addDonor(this.state.name,this.state.latitude,this.state.longitude, this.state.mobile, this.state.group) } style = {{ marginLeft: 30, marginRight:30 }}/>
                 
                          </View>
          }
        </View>

        <View>
          <View style = {{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop:20, marginBottom: 10 }}>
            <Text style = {{ fontSize:15, fontWeight: 'bold', color:'#e89494', }}>Acontecimento</Text>
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
                <Text>{item.name} ({item.group}) </Text>
                      <Text note numberOfLines={1}>Mob: {item.mobile}</Text>
                      <Text>{item.latitude} {item.longitude}</Text>
                 
                   
                     
                   </View>
                      
                ))}
        </View>
      }
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
}
});
/*
import React from 'react'
import { Button, Alert, StyleSheet, Text, View } from 'react-native'
import Form from 'react-native-advanced-forms'
//import ActionButton from 'react-native-action-button';
//import Icon from 'react-native-vector-icons/Ionicons';
//import { Tile } from 'react-native-elements';


export default class App extends React.Component {
  constructor (props, ctx) {
    super(props, ctx)

    this.state = {
      title: null,
      nickname: "Abrir Chat",
      age: null,
      country: null,
    }
  }
  
  
  render() {
    

    const {
      title, nickname, age, country
    } = this.state
    
    return (
        <View style={styles.container}>
       <Button title="Favoritos" onPress={() => navigation.navigate('SavedScreen')}/>
      <Button title="Voltar para Perfil" onPress={() => navigation.navigate('Profile')} />     
    
        <Form ref={this._onFormRef} onChange={this.onChange} 
        onSubmit={this.onSubmit} validate={this.validate}>
          <Form.Layout style={styles.row}>
            
              <Form.Field name="title" label="Lugar" style={styles.field}>
                <Form.TextField value={title} />
              </Form.Field>
              </Form.Layout>
          <Form.Layout style={{display:"none"}}>
              <Form.Field name="nickname" label="Chat" style={styles.field}>
                <Form.TextField value={nickname} />
              </Form.Field>
            
          </Form.Layout>
          <Form.Layout style={styles.row}>
            <Form.Field name="age" label="codigo" style={styles.ageField}>
              <Form.TextField value={age} keyboardType='numeric'/>
            </Form.Field>
          </Form.Layout>
          <Form.Layout style={styles.row}>
            <Form.Field name="country" label="Cidade" style={styles.field}>
              <Form.TextField value={country} />
            </Form.Field>
          </Form.Layout>
        </Form>
        <View style={styles.button}>
          <Button
            disabled={this.form && !this.form.canSubmit()}
            onPress={() => this.form.validateAndSubmit()}
            title="Submit"
            color="#841584"
          />
        </View>
      </View>
    )
  }

  _onFormRef = e => {
    this.form = e
  }

  onChange = (values) => {
    this.setState(values)
  }

  onSubmit = (values) => {
    Alert.alert("Novo Lugar adicionado" + JSON.stringify(values))
    console.log('Submitted: /m' + JSON.stringify(values))
    


  }

  validate = (values) => {
    const ret = Object.keys(this.state).reduce((m, v) => {
      if (!values[v] || !values[v].length) {
        m[v] = Form.VALIDATION_RESULT.MISSING
      }
      return m
    }, {})

    if (!ret.age && isNaN(values.age)) {
      ret.age = Form.VALIDATION_RESULT.INCORRECT
    }

    return ret
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 100,
    paddingHorizontal: 30
  },
  row: {
    marginBottom: 20,
  },
  columns: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  field: {
    marginRight: 10,
    width:130,
    borderBottomWidth:1
  },
  ageField: {
    width: 80,
    borderBottomWidth:1
  },

  button: {
    width: 80,
    marginTop: 15,
  },
  error: {
    marginTop: 10,
  },
  errorMsg: {
    color: 'red'
  }
})*/