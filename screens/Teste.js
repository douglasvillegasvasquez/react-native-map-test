import React, { Component } from "react";
import { View,TouchableOpacity,Button,ScrollView,TextInput, StyleSheet,Text,FlatList, Alert, Picker } from 'react-native';
//import { List, ListItem,Container, Header, Content, Left, Right, Body, Title, Button,Item, Input,  } from "native-base";
//import Communications from 'react-native-communications';
import { Ionicons} from '@expo/vector-icons';
import Form from 'react-native-advanced-forms';
import { connect } from 'react-redux';
import  moment   from 'moment';
import { Font } from 'expo';
 class Teste extends Component {

  constructor(props) {
    super(props);
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
      where: {lat:null, lng:null},
      myDate: null
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
   

   
   console.log(position.coords.latitude);
    console.log(position.coords.longitude);
     
        this.setState({
          ready:true,
          where: {lat:position.coords.latitude, lng:position.coords.longitude},
         
        })
       
    }
  

  async getDonor() {     
        return fetch(`https://infocitypi.firebaseio.com/markers.json`)
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
    if(this.state.name != null  && this.state.referencia != null && this.state.group != null){ 
      fetch('https://infocitypi.firebaseio.com/markers.json', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "name": name,
          "latitude": this.state.where.lat,
          "longitude": this.state.where.lat,
          "referencia": referencia,
          "group": group,
          "myDate":new Date(),
          "user":this.props.user.fullname,
          
        }),
      })
      .then((response) => response.json())
      .then((responseData) => {
              if(responseData.name != null ){
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
            <Text style = {{ fontSize:15, fontWeight: 'bold', color:'#000', }}>Selecione um topico</Text>
          </View>
          
      <View style = { styles.picker }>
            <Picker
                selectedValue={ (this.state.grouptoBeFiltered && this.state.pickerValue) || 'a'}
                onValueChange={this.onValueChange2.bind(this)}>
                <Picker.Item label="Topicos" value="null" />
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
                <View style={styles.box2}><Text style={{fontSize:18}}>({item.group})</Text>
                </View>
                  <View style={styles.box}>
                
                <Text>{item.name} </Text>
                      <Text style={{fontSize:10,marginRight:13}} note numberOfLines={1}> {item.referencia}</Text>
                      </View>   
                   
                   
                     
                   </View>
                      
                ))}
        </View>
      }   
        <View style = {{ marginLeft: 10, marginRight:10 }}>
          <View style = {{ backgroundColor:"#fFF", marginTop: 10 }}>
          {this.state.isSubmited
          ? 
            <TouchableOpacity onPress = { () => this._toggleDonorPost()}>
              <Text style = {{ fontSize:20, color:'#FA0' }}>Adicionar mais Ocorrencias</Text>
            </TouchableOpacity>
          :
            <View style = {{ paddingLeft: 20, paddingRight: 20, paddingBottom: 40  }}>
             <View style = {{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop:20 }}>
                <Text style = {{ fontSize:15, fontWeight: 'bold', color:'#FA0', }}>Nova Ocorrencia</Text>
              </View>

            <View style = { styles.picker }>
                <Picker
                    selectedValue={ (this.state.group && this.state.pickerValue) || 'a'}
                    onValueChange={this.onValueChange.bind(this)}>
                    <Picker.Item label="Topicos" value="null" />
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
                <TextInput style = {styles.input2} placeholder="O que houve" 
                onChangeText={input => this.setState({ name: input })} 
                />
              </View>

              <View rounded style = {styles.input}>
                <TextInput style = {styles.input2} placeholder="Referencia ou nome do local" 
                onChangeText={input => this.setState({ referencia: input })} 
                
                />
              </View>
            
              <View style={styles.button}>
              <TouchableOpacity>
              <Button color="orange"  title="Ok" onPress={ () => this.addDonor(this.state.name, this.state.referencia, this.state.group) } />
              </TouchableOpacity>
              </View>

              <View style={styles.button}>
              
              <Button color="orange" title="Voltar para Perfil" onPress={() => this.props.navigation.navigate('Profile')} />         
              
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
  backgroundColor:"#AAAA"
},
box:{
  backgroundColor:"#AAD",
  padding:10,
  marginRight: 40,
  marginLeft:30,
  borderRadius: 10,
  alignItems:"flex-end",
  height: 60
},
box2:{
 
  alignItems:"center",

},
timeline:{
  height:200
},
button:{
  
  marginBottom:20,
  borderRadius:30
},
input:{ marginBottom: 20, marginTop:20,height:35, borderBottomWidth: 1,backgroundColor:"#FFF",borderRadius:10 }
,input2:{
  marginLeft:9
}
});
const mapStateToProps = state => {
  return {
      user: state.user
  }
}
export default connect(mapStateToProps)(Teste)