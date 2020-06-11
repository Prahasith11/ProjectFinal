import MapView, { PROVIDER_GOOGLE, Polygon } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {View,Text,ScrollView,StyleSheet} from 'react-native';
import React,{Component} from 'react';
import { AsyncStorage } from 'react-native'
const axios = require('axios')

const styles = StyleSheet.create({
 container: {
   
   height: 400,
   width: 400,
   
 },
 map: {
   height:600,
   width :500
 },
});

export default class Maps extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userDetails : [],
      index: 0
    }
  }

  componentDidMount = async => {
    //this._getData()
   // this._getUserIndex()
    this.getDataB()
  }

  async getDataB() {
   
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTE4ODg3MjgsInVzZXJuYW1lIjoicHJhaGFzaXRoMTFAZ21haWwuY29tIiwicGFzc3dvcmQiOiJwdyIsImlhdCI6MTU5MTg1MjcyOH0.A1B5RB2F89sK6GylUEPOw69X0IxpXKjzeDVfBIMZ_Ds'
    }

    const body = {
      fcn: "queryAllCars",
      peer: "peer0.org1.example.com",
      args: ["supercar"]
    }
    
    try {
      let response = await axios.post('http://192.168.42.102:4000/query/channels/mychannel/chaincodes/fabcar', body, {
        headers: headers
      })
      
      
      this.setState({
        userDetails: response.data
      })

    } catch (error) {
      alert(JSON.stringify(error))
    }
  }


  async _getData () {
    try{
      const value = await AsyncStorage.getItem('user');
      let details = JSON.parse(value);
    
      if (value !== null) {
        // Our data is fetched successfully
      }
    
      //alert(JSON.stringify(details))
      this.setState({
        userDetails : details
      })
    }
    catch(error){
      alert(error)
    }
  }

  _getUserIndex = () =>{
    var found = this.state.userDetails.findIndex(function(iterator){
      return iterator.email == this.props.email
  })
  this.setState({
    index : found
  })
}

  render(){
    
   return(
     
     <View>
       <Text>{this.props.email}</Text>
       {
         this.state.userDetails.map(user => {
           return (
             user.Key == this.props.email ? 
              <Text> Money in Wallet :  {user.Record.amount}</Text>:
              null
           )
         })
       }
     </View>
  );
  }
}