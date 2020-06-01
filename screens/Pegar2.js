import React, {useState} from 'react'
import {ScrollView, Button,StyleSheet, Text, TextInput,View,Keyboard, } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
// esse ainda nao terminei mas tera que inserir em forma de function e const. nao consigo nao aff
export default function Pegar ({navigation}) {
    const [lugares, setLugares] = useState([]);
    const [valor, setValor] = useState('');
    const [error, setError] = useState(false);
    
    const getValor = (valor) => {
        setValor(valor);
    }

    const getLugares = () => {
        setLugares([]);
    
        fetch(`https://infocitypi.firebaseio.com/marker.json`)
        .then((response) => response.json())
        .then((responseJson) => {
            
            if(responseJson.object && responseJson.object == 200) {
                setError(false);
                console.log("erro mesmo")
            }else{
                setError(true);
                console.log('ficou true')
                console.log(responseJson)
               
            }
        setLugares([responseJson]),
      
                console.log(lugares)
        Keyboard.dismiss()
        });
    }
            return(
                <View style={styles.container}>
                
                <View style={styles.input}>
                <TextInput style={styles.lugar} placeholder=" Pesquisar no mapa" value={valor}
                    onChangeText={getValor}
                />
                <Button title="Pesquisar" onPress={getLugares}/>
                    
                </View>
                
                {error ?
                 <Text> Erro na base</Text>
                :    
                <FlatList
                data={lugares}
                rendetItem = {
                    lugar => (

                        <View lugar={lugares}/>
                    )
                }
                />
                }
                <Button title="Voltar para Perfil" onPress={() => navigation.navigate('Profile')} />  
                </View>
            );
        }


            // let todos = this.state.donors.map((item, index) =>{
            //     return <View key={index} style={styles.item}>
            //     <Text>{item.latitude}</Text>
            //     <Text>{item.longitude}</Text>
            //     <Text>{item.name}</Text>
            // </View>
            // });

            // return (
            //     <ScrollView style={styles.container}>
            //       {todos}
            //       <Button title="Voltar para Perfil" onPress={() => this.props.navigation.navigate('Profile')} />
            //     </ScrollView>
            // )
            
                
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

    },
    input:{
        justifyContent: 'center',
        alignItems:'center',
        margin:20,
        padding:10,
          
    },
    lugar:{
        justifyContent: 'center',
        alignItems:'center',
        margin:20,
        padding:10,
    }
})
