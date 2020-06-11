import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Animated,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native';

import AnimatedForm from 'react-native-animated-form';
import Background from '../bg.jpg';
const axios = require('axios')

const AnimatedInput = Animated.createAnimatedComponent(TextInput);
export default class Register extends Component<props, state> {
    constructor(props) {
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    }

    submitForm = async (event) => {
        event.preventDefault();
        const userDetails = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            username: this.state.email,
            password: this.state.password,
            userorg: 'Org1',
            confirmPassword: this.state.confirmPassword
        }
        if (userDetails.password != userDetails.confirmPassword) {
            alert("Password do not match")
        }
        else {
            
            let response = await axios.post('http://192.168.42.102:4000/users',userDetails);
            alert("it is here")
            alert(JSON.stringify(response.data));
        }
    }

z
    render() {
        return (
            <View style={styles.container}>
                <Image style={[StyleSheet.absoluteFill, { width: null, height: null }]} source={Background} />
                <AnimatedForm delay={100} distance={5}>
                    <AnimatedInput placeholder='First name' underlineColorAndroid='transparent' style={styles.text}
                        onChangeText={(text) => {

                            this.setState({
                                firstName: text
                            })
                        }} />
                    <AnimatedInput placeholder='Last name' underlineColorAndroid='transparent' style={styles.text}
                        onChangeText={(text) => {

                            this.setState({
                                lastName: text
                            })
                        }} />
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
                        }} />
                    <AnimatedInput placeholder='Confirm password' underlineColorAndroid='transparent' style={styles.text}
                        onChangeText={(text) => {
                            this.setState({
                                confirmPassword: text
                            })
                        }} />

                    <Animated.View style={styles.buttonView}>
                        <TouchableOpacity style={styles.button}
                            onPress={this.submitForm
                                //this.props.navigation.navigate('Home')
                            }
                        >
                            <Text style={{ color: '#fff' }}>Register</Text>
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