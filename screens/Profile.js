import * as React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux'
import Firebase from '../config/Firebase'

class Profile extends React.Component {
  handleSignout = () => {
    Firebase.auth().signOut()
    this.props.navigation.navigate('Login')
  }
  //ajuste pra ir proxima tela nao funciona
  goApp2 = () => {
    Firebase.auth()
    this.props.navigation.navigate('GeoLocalizacao')
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <OptionButton
            icon="md-person"
            label={this.props.user.fullname}
            onPress={this.goApp2}    
            /> */}
        <Button
          title='Teste'
          onPress={() => this.props.navigation.navigate('Teste')}
        />
        <OptionButton
          label="Sair"
          onPress={this.handleSignout}
        />


      </View>
    )
  }
}

function OptionButton({ icon, label, onPress, isLastOption }) {
  return (
    <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
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
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Profile)