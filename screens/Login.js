import React from 'react'
import { View, TextInput, StyleSheet, Text, Button, Image, TouchableHighlight, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateEmail, updatePassword, login, getUser } from '../actions/user'
import Firebase from '../config/Firebase'

class Login extends React.Component {
    constructor() {
        super();
        this.unsubscriber = null;
        this.state = {
            loading: false,
        };
    }

    renderButtonOrLoading() {
        if (this.state.loading) {
            return <View style={styles.button}><ActivityIndicator /></View>
        }
        if (!this.props.user.email == '' && !this.props.user.password == '') {
            return <TouchableHighlight id='btnAcessar' style={styles.button} onPress={() => { this.props.login(); this.setState({ loading: true }) }}><Text style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold' }}>ACESSAR</Text></TouchableHighlight>;
        }
        return <TouchableHighlight style={styles.buttonDisabled} disabled={false} onPress={() => this.props.login()}><Text style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold' }}>ACESSAR</Text></TouchableHighlight>;
    }

    componentDidMount = () => {
        Firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.getUser(user.uid)
                if (this.props.user != null) {
                    this.props.navigation.navigate('Profile')
                }
            }
        })
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

                    {this.renderButtonOrLoading()}
                    <Button
                        title="Ainda não tem conta? Cadastre-se agora mesmo!"
                        onPress={() => this.props.navigation.navigate('Signup')}
                    />
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
    img: {
        alignSelf: 'center',
        width: '70%',
        marginBottom: 20
    },
    button: {
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: '#0a6ebd',
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
    buttonDisabled: {
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: '#0a6ebd',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
    },
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ updateEmail, updatePassword, login, getUser }, dispatch)
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)