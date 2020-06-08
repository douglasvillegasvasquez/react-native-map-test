import * as React from 'react';
import { YellowBox, View, Text, StyleSheet,TouchableWithoutFeedback,Image, Button } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux'
import Firebase from '../config/Firebase'

class Profile extends React.Component {
  constructor() {
    super();
    console.ignoredYellowBox = [
    'Setting a timer'
    ];
    }
  static navigationOptions = {
    title: 'Profile'
}
    handleSignout = () => {
        Firebase.auth().signOut()
        this.props.navigation.navigate('Login')
    }

  
goApp6 = () => {
  Firebase.auth()
  this.props.navigation.navigate('MessagesScreen')
}
goApp7 = () => {
  Firebase.auth()
  this.props.navigation.navigate('Mapas')
}
goAppMapa = () => {
  Firebase.auth()
  this.props.navigation.navigate('GeoLocalizacao')
}
goAppMaps = () => {
  Firebase.auth()
  this.props.navigation.navigate('Pegar')
}
goApp8 = () => {
  Firebase.auth()
  this.props.navigation.navigate('SavedScreen')
}
    render() {
        return (
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <OptionButton
            icon="md-person"
            label={ this.props.user.fullname}
            title= "Entrar no App"
            onPress={this.goApp2}    
            />
            <OptionButton
            icon="md-mail"
            label={ this.props.user.email}
            title= "Entrar no App"
            onPress={this.goApp2}    
            />
            
            <OptionButton
            icon="md-heart"
            label="Salvos"
            title= "Entrar no App"
            onPress={this.goApp8}    
            />
            <OptionButton
            icon="md-mail"
            label="Mensagens"
            title= "Entrar no App"
            onPress={this.goApp6}    
            />
            <OptionButton
            icon="md-map"
            label="Explorar Mapa"
            title= "Entrar no App"
            onPress={this.goApp7}    
            />
           
            <OptionButton
            label="Sair"
            onPress={this.handleSignout} 
            />

<View
          
          style={{
            flex:1,
             flexDirection:"row",
             bottom: 0,
            marginTop:"29.4%",
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
           <Ionicons name="md-chatboxes" size={34} color="gray">
           <Text style={styles.text}>         </Text>
           <Text style={styles.text}>Mensagens</Text>
           </Ionicons>
           </TouchableWithoutFeedback>
           </View>
           <View style={{width:70,paddingLeft:10}}>
           <TouchableWithoutFeedback color="white" title="" onPress={() => this.props.navigation.navigate('Profile')}>
           <Ionicons style={styles.textview} name="md-person" size={34} color="orange">
           
           <Text style={styles.text}>         </Text>
           <Text style={styles.text}>Perfil</Text>
           </Ionicons>
           
           </TouchableWithoutFeedback>
            
           </View>
           
         </View>
         
            </ScrollView>
            
        )
    }
}

function OptionButton({ icon, label, onPress, isLastOption }) {
    return (
      <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
        <View style={{ flexDirection: 'row', padding:15 }}>
          <View style={styles.optionIconContainer}>
            <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
          </View>
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionText}>{label}</Text>
          </View>
        </View>
      </RectButton>
    );
  }
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
     
    },
    contentContainer: {
      paddingTop: 15,
    },
    optionIconContainer: {
      marginRight: 12,
    },
    option: {
      backgroundColor: '#fdfdfd',
      paddingHorizontal: 15,
      paddingVertical: 15,
      borderWidth: StyleSheet.hairlineWidth,
      borderBottomWidth: 0,
      borderColor: '#ededed',
    },
    lastOption: {
      borderBottomWidth: StyleSheet.hairlineWidth,
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
    optionText: {
      fontSize: 15,
      alignSelf: 'flex-start',
      marginTop: 1,
    },
})

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Profile)

