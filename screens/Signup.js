import React from 'react'
import { Platform, Image, View, TextInput, StyleSheet, TouchableOpacity, Text, ActivityIndicator, TouchableHighlight, KeyboardAvoidingView } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateFullname, updateEmail, updatePassword, signup } from '../actions/user'

class Signup extends React.Component {
    handleSignUp = () => {
        this.props.signup()
        this.props.navigation.navigate('Login')
    }

    render() {
        return (
            <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? "padding" : "height"} style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <View style={styles.inputContainer}>
                    <Image style={styles.img} resizeMode="contain" source={require('../images/logo.png')} />
                    <TextInput
                        style={styles.input}
                        value={this.props.user.fullname}
                        onChangeText={fullname => this.props.updateFullname(fullname)}
                        placeholder='Nome completo'
                        autoCapitalize='none'
                    />
                    <TextInput
                        style={styles.input}
                        value={this.props.user.email}
                        onChangeText={email => this.props.updateEmail(email)}
                        placeholder='Email'
                        autoCapitalize='none'
                        keyboardType='email-address'
                    />
                    <TextInput
                        style={styles.input}
                        value={this.props.user.password}
                        onChangeText={password => this.props.updatePassword(password)}
                        placeholder='Senha'
                        secureTextEntry={true}
                    />
                    <TouchableOpacity style={styles.buttonCadastro} onPress={this.handleSignUp}>
                        <Text style={styles.buttonText}>Cadastrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonVoltar} onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={styles.buttonText}>Voltar</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        padding: 15,
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderColor: 'rgb(235,235,235)',
        borderWidth: 1
    },
    inputContainer: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 20,
        backgroundColor: 'rgb(245,245,245)',
        alignSelf: 'stretch',
        marginHorizontal: 20,
    },
    buttonCadastro: {
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: '#0a6ebd',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    buttonVoltar: {
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: '#fca853',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center'
    },
    img: {
        alignSelf: 'center',
        width: '70%',
        marginBottom: 20
    },
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ updateFullname, updateEmail, updatePassword, signup }, dispatch)
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Signup)