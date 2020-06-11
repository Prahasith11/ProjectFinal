import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Animated,
    TextInput,
    TouchableOpacity,
    Image,
    AsyncStorage
} from 'react-native';

import AnimatedForm from 'react-native-animated-form';
import Background from '../bg.jpg';
import { Asyncstorage } from 'react-native';
const axios = require('axios');





const AnimatedInput = Animated.createAnimatedComponent(TextInput);
export default class Login extends Component<props, state> {

    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            landDetails: [],
            title: "",
            address: "",
            price: "",
            forSale: "",
            Lat1: "",
            Lat2: "",
            Lat3: "",
            Lat4: "",
            Long1: "",
            Long2: "",
            Long3: "",
            Long4: "",
        }
    }

    componentDidMount() {
        this._getData();
    }

    _getData = async () => {
        try {
            const value = await AsyncStorage.getItem('name');
            let details = JSON.parse(value);

            if (value !== null) {
                // Our data is fetched successfully
            }

            this.setState({
                landDetails: details
            })
        }
        catch (error) {
            alert("error in getting data from localstorage")
        }

    }

    checkFormB = async (event) => {
     //   event.preventDefault()
        let newLand = {
            fcn:'createLand',
            peers:['peer0.org1.example.com','peer0.org2.example.com'],
            args :["Library1",
                "prahasith11@gmail.com",
                "prahasit",
                "4096",
                "address1",
                "true",
                "17.984203",
                "79.530457",
                "17.984196",
                "79.530029",
                "17.984666",
                "79.530027",
                "17.984671",
                "79.530439",
                "",
                "100"
            ],
            chaincode: 'fabcar',
            channelName: 'mychannel',
            titleName: "abc",
            email: "aa",
            firstName: "",
            area: "4096 sq",
            address: "this.state.address",
            forSale: "this.state.forSale",
            latitude1: "this.state.Lat1",
            longitude1: "this.state.Long1",
            latitude2: "this.state.Lat2",
            longitude2: "this.state.Long2",
            latitude3: "this.state.Lat3",
            longitude3: "this.state.Long3",
            latitude4: "this.state.Lat4",
            longitude4: "this.state.Long4",
            requestedBy: ""

        }

       

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTE4ODg3MjgsInVzZXJuYW1lIjoicHJhaGFzaXRoMTFAZ21haWwuY29tIiwicGFzc3dvcmQiOiJwdyIsImlhdCI6MTU5MTg1MjcyOH0.A1B5RB2F89sK6GylUEPOw69X0IxpXKjzeDVfBIMZ_Ds'
          }

        try{
        await axios.post('http://192.168.42.102:4000/channels/mychannel/chaincodes/fabcar',newLand,{
            headers:headers
        })
        }catch(error){
            console.log(JSON.stringify(error))
        }

    }

    checkForm = async (event) => {
        event.preventDefault()
        let newLand = {
            titleName: this.state.title,
            email: "",
            firstName: "",
            area: "4096 sq",
            address: this.state.address,
            forSale: this.state.forSale,
            latitude1: this.state.Lat1,
            longitude1: this.state.Long1,
            latitude2: this.state.Lat2,
            longitude2: this.state.Long2,
            latitude3: this.state.Lat3,
            longitude3: this.state.Long3,
            latitude4: this.state.Lat4,
            longitude4: this.state.Long4,
            requestedBy: ""

        }
        let landArray = this.state.landDetails;
        landArray.push(newLand);
        try {
            await AsyncStorage.setItem('name', landArray);
        }
        catch (error) {
            alert("error in adding land")
        }


    }

    render() {
        return (
            <View style={styles.container}>

                <Image style={[StyleSheet.absoluteFill, { width: null, height: null }]} source={Background} />
                <AnimatedForm delay={100} distance={5}>

                    <AnimatedInput placeholder='Title' underlineColorAndroid='transparent' style={styles.text}
                        onChangeText={(text) => {

                            this.setState({
                                address: text
                            })
                        }} />

                    <AnimatedInput placeholder='Address' underlineColorAndroid='transparent' style={styles.text}
                        onChangeText={(text) => {

                            this.setState({
                                address: text
                            })
                        }} />
                    <AnimatedInput placeholder='Price' underlineColorAndroid='transparent' style={styles.text}
                        onChangeText={(text) => {

                            this.setState({
                                password: text
                            })
                        }} />

                    <AnimatedInput placeholder='ForSale' underlineColorAndroid='transparent' style={styles.text}
                        onChangeText={(text) => {

                            this.setState({
                                password: text
                            })
                        }} />
                    <AnimatedInput placeholder='Lat1' underlineColorAndroid='transparent' style={styles.text}
                        onChangeText={(text) => {

                            this.setState({
                                password: text
                            })
                        }} />
                    <AnimatedInput placeholder='Long1' underlineColorAndroid='transparent' style={styles.text}
                        onChangeText={(text) => {

                            this.setState({
                                password: text
                            })
                        }} />
                    <AnimatedInput placeholder='Lat2' underlineColorAndroid='transparent' style={styles.text}
                        onChangeText={(text) => {

                            this.setState({
                                password: text
                            })
                        }} />
                    <AnimatedInput placeholder='Long2' underlineColorAndroid='transparent' style={styles.text}
                        onChangeText={(text) => {

                            this.setState({
                                password: text
                            })
                        }} />
                    <AnimatedInput placeholder='Lat3' underlineColorAndroid='transparent' style={styles.text}
                        onChangeText={(text) => {

                            this.setState({
                                password: text
                            })
                        }} />
                    <AnimatedInput placeholder='Long3' underlineColorAndroid='transparent' style={styles.text}
                        onChangeText={(text) => {

                            this.setState({
                                password: text
                            })
                        }} />
                    <AnimatedInput placeholder='Lat4' underlineColorAndroid='transparent' style={styles.text}
                        onChangeText={(text) => {

                            this.setState({
                                password: text
                            })
                        }} />
                    <AnimatedInput placeholder='Long4' underlineColorAndroid='transparent' style={styles.text}
                        onChangeText={(text) => {

                            this.setState({
                                password: text
                            })
                        }} />

                    <Animated.View style={styles.buttonView}>
                        <TouchableOpacity style={styles.button}
                            onPress={() => { this.checkFormB()/*this.props.navigation.navigate('Register')*/ }}>
                            <Text style={{ color: '#fff' }}>Add</Text>
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