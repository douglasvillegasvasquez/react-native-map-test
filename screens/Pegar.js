import React, { Component } from 'react'
import {ScrollView, Button,StyleSheet, Text, View, ActivityIndicator, } from 'react-native'
//esse insere no real base time database por meio de classes e estados
export default class Pegar extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
            isLoading:true,
            dataSource:null,
             
        }
    }
    componentDidMount () {
        return fetch(`https://infocitypi.firebaseio.com/marker.json`)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            isLoading: false,
            donors: Object.values(responseJson),
//            donors: Object.values(responseJson),
          });
        })
        .catch((error) => {
          console.error(error);
        });   

        
    }


    render() {

        if(this.state.isLoading){
            return(
                <View style={styles.container}>
                    <ActivityIndicator/>
                </View>
                
            )
        }else{

            let group = this.state.donors.map((val,key) =>{
                return <View key={key} style={styles.item}>
                    <Text>{val.group}</Text>
                </View>

            });
            let latitude = this.state.donors.map((val,key) =>{
                return <View key={key} style={styles.item}>
                    <Text>{val.latitude}</Text>
                </View>

            });
            let longitude = this.state.donors.map((val,key) =>{
                return <View key={key} style={styles.item}>
                    <Text>{val.longitude}</Text>
                </View>

            });
            let name = this.state.donors.map((val,key) =>{
                return <View key={key} style={styles.item}>
                    <Text>{val.name}</Text>
                </View>

            });
            let mobile = this.state.donors.map((val,key) =>{
                return <View key={key} style={styles.item}>
                    <Text>{val.mobile}</Text>
                </View>

            });
            let todos = this.state.donors.map((item, index) =>{
                return <View key={index} style={styles.item}>
                <Text>{item.latitude}</Text>
                <Text>{item.longitude}</Text>
                <Text>{item.name}</Text>
            </View>
            });

            return (
                <ScrollView style={styles.container}>
                  
   
                  {group}
                  {latitude}
                  {longitude}
                  {name}
                  {mobile}
                  {todos}
                  <Button title="Voltar para Perfil" onPress={() => this.props.navigation.navigate('Profile')} />
                </ScrollView>
            )
        }
    }
}

//export default Pegar

const styles = StyleSheet.create({
    container:{
        flex: 1,
        
    },
    item:{
        flex: 1,
        alignSelf:'stretch',
        margin:10,
        justifyContent: 'center',
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'#eee'

    }
})
