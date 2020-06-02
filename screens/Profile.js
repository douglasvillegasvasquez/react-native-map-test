import * as React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux'
import Firebase from '../config/Firebase'

class Profile extends React.Component {
  static navigationOptions = {
    title: 'Profile'
}
    handleSignout = () => {
        Firebase.auth().signOut()
        this.props.navigation.navigate('Login')
    }

  
goApp6 = () => {
  Firebase.auth()
  this.props.navigation.navigate('Teste')
}
goApp7 = () => {
  Firebase.auth()
  this.props.navigation.navigate('Mapas')
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
            icon="md-add-circle"
            label="Salvos"
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

