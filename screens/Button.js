
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
    Alert.alert("Novo Lugar adicionado com sucesso" )
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
})