import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Animated,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native';

import { data } from '../reusables/Userdata';
import { landDetails } from '../reusables/landDetail'; 
import { userDetails } from '../reusables/Userdata';
import { AsyncStorage } from 'react-native';
import AnimatedForm from 'react-native-animated-form';
import Background from '../bg.jpg';
const axios = require('axios');


const AnimatedInput = Animated.createAnimatedComponent(TextInput);
export default class Login extends Component<props,state> {

    constructor(props){
        super(props)
        this.state = {
            email: "",
            password: "",    
        }
        
    }

    componentDidMount = async () => {
      //  this._storeData();
    }

    _eraseData = async () => {
        try{
            await AsyncStorage.clear();
        }
        catch(error){
            alert("Error while clearing the data");
        }
    }

    _storeData = async () => {
       
        try { 
            await AsyncStorage.setItem('name', JSON.stringify(landDetails));
            await AsyncStorage.setItem('user',JSON.stringify(userDetails));   
            }
         catch (error) {
             alert(error);
            console.log(error);
        }
    }

    

    checkFormB = async(event) => {
        event.preventDefault()
        const userDetails = {
            username: this.state.email,
            password: this.state.password,
            userorg: 'Org1'
        }
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTE4ODg3MjgsInVzZXJuYW1lIjoicHJhaGFzaXRoMTFAZ21haWwuY29tIiwicGFzc3dvcmQiOiJwdyIsImlhdCI6MTU5MTg1MjcyOH0.A1B5RB2F89sK6GylUEPOw69X0IxpXKjzeDVfBIMZ_Ds'
          }

        let response = await axios.post('http://192.168.42.102:4000/login',userDetails,{
            headers: headers
        })

        if(response.data.message == true){
            this.props.navigation.navigate('MainScreen',{email:userDetails.username})
        }
        else{
            alert(JSON.stringify(response.data.message))
        }
    
    }


    checkForm = async(event) => {
        event.preventDefault()
        const userDetails = {
            email: this.state.email,
            password: this.state.password
        }
        // Remove this line
        this.props.navigation.navigate('MainScreen',{email:userDetails.email})

        let response = await axios.post('http://192.168.42.102:3001/loginUser',userDetails)
        
        if(response.data == "success"){
            this.props.navigation.navigate('MainScreen',{email:userDetails.email})
        }
        else{
           // alert(response.data)
        }
    
    }

    render() {
        return (
            <View style={styles.container}>
                <Image style={[StyleSheet.absoluteFill, {width: null, height: null}]} source={Background} />
                <AnimatedForm delay={100} distance={5}>
                   
                    <AnimatedInput placeholder='Email' underlineColorAndroid='transparent' style={styles.text}
                         onChangeText={(text) => {

                            this.setState({
                                email: text
                            })
                        }} />
                    <AnimatedInput placeholder='Password' underlineColorAndroid='transparent' style={styles.text} 
                     onChangeText={(text) => {

                        this.setState({
                            password: text
                        })
                    }}/>
                    
 
                    <Animated.View style={styles.buttonView}>
                        <TouchableOpacity style={styles.button}
                            onPress = {this.checkFormB
                               // axios.get('http://192.168.42.102:3000/').then((response) => {alert(JSON.stringify(response.data))})
                               // this.props.navigation.navigate('MainScreen')
                            }>
                            <Text style={{color: '#fff'}}>Login</Text>
                        </TouchableOpacity>
                    </Animated.View>

                    <Animated.View style={styles.buttonView}>
                        <TouchableOpacity style={styles.button}
                            onPress = {()=>{/*this._eraseData()*/this.props.navigation.navigate('Register')}}>
                            <Text style={{color: '#fff'}}>Sign up</Text>
                        </TouchableOpacity>
                    </Animated.View>

                </AnimatedForm>
            </View>
        );
    }
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#919191',
    },
    text: {
        width: 250,
        height: 50,
        paddingHorizontal: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#FFF",
        color: "#333",
        backgroundColor: "#FFF",
      },
      buttonView: {
        height: 40,
        marginTop: 10,
        backgroundColor: "tomato",
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderRadius: 5,
      },
      button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }
});