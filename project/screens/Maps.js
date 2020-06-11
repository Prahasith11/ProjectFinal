import MapView, { PROVIDER_GOOGLE, Polygon, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {View,Text,ScrollView,StyleSheet,Button,Switch} from 'react-native';
import React,{Component} from 'react';
import { AsyncStorage } from 'react-native';

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

const axios = require('axios');



export default class Maps extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      coordinates : [{
             latitude:18.966146,
             longitude:79.597425
          }],
      showPolygon: false,
      email: props.navigation.getParam('email','nothing'),
      land: props.navigation.getParam('land','nothing'),
      requested: false,
      MapView: 'standard',
      landDetails:[],
      history: false
    }
  }

  componentDidMount = async  => {
    this.getDataB();
  }

  async getDataB() {
   
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTE4ODg3MjgsInVzZXJuYW1lIjoicHJhaGFzaXRoMTFAZ21haWwuY29tIiwicGFzc3dvcmQiOiJwdyIsImlhdCI6MTU5MTg1MjcyOH0.A1B5RB2F89sK6GylUEPOw69X0IxpXKjzeDVfBIMZ_Ds'
    }

    const body = {
      fcn: "getHistoryForAsset",
      peer: "peer0.org1.example.com",
      args: ["Library"]
    }
    
    try {
      let response = await axios.post('http://192.168.42.102:4000/query/channels/mychannel/chaincodes/fabcar', body, {
        headers: headers
      })
      
      
      this.setState({
        landDetails: response.data
      })

    } catch (error) {
      alert(JSON.stringify(error))
    }
  }

  toggelMap = () => {
    if(this.state.MapView == 'standard'){
      this.setState({
        MapView:'satellite'
      })
    }
    else{
      this.setState({
        MapView:'standard'
      })
    }
  }

  handleRequestB = async (event) => {
    
    let newLand = {
      fcn:'createLand',
      peers:['peer0.org1.example.com','peer0.org2.example.com'],
      args :[this.state.land.Record.titleName,
      this.state.land.Record.email,
          this.state.land.Record.firstName,
          this.state.land.Record.area,
          this.state.land.Record.address,
          this.state.land.Record.forSale,
          this.state.land.Record.latitude1,
          this.state.land.Record.longitude1,
          this.state.land.Record.latitude2,
          this.state.land.Record.longitude2,
          this.state.land.Record.latitude3,
          this.state.land.Record.longitude3,
          this.state.land.Record.latitude4,
          this.state.land.Record.longitude4,
          this.state.email,
          this.state.land.Record.price
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
      'Authorization': 'Bearer '+ 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTE1NDExNTUsInVzZXJuYW1lIjoicHJhaGFzaXRoMTFAZ21haWwuY29tIiwicGFzc3dvcmQiOiJwdyIsImlhdCI6MTU5MTUwNTE1NX0.y6uf2HbUIS48xtiTwZ6o-fHMLX7rdbF7lQ225Z6Cf3k'
    }

  try{
  let response= await axios.post('http://192.168.42.102:4000/channels/mychannel/chaincodes/fabcar',newLand,{
      headers:headers
  })
    alert(response)
  }catch(error){
      console.log(error)
  }

  }

  handleRequest = async () => {
    try{
      const value = await AsyncStorage.getItem('name');
      let details = JSON.parse(value);
      
      if (value == null) {
        alert("error fetching details")
      }
     
      let obj = details.find((temp,iterator) =>{
        
        if(temp.titleName === this.state.land.titleName){
          details[iterator].requestedBy = this.state.email;
          return true;
        }
      } )

      alert(JSON.stringify(details));
     
      await AsyncStorage.setItem('name',JSON.stringify(details));
     
    }
    catch(error){
      alert(error)
    }
  }
 
  plotMap = (event) =>{
    let position = {
      latitude:event.nativeEvent.latitude,
      longitude: event.nativeEvent.longitude
    }
    var tempArray = this.state.coordinates
    tempArray.push(position)
    this.setState = {
      coordinates: tempArray
    }
  }

  render(){
   
   return(
   <ScrollView style={styles.container}>
     { <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       mapType = {this.state.MapView}
       onPress = {(event) =>{
         this.plotMap(event)
       }}
       region={{
        latitude:Number(this.state.land.Record.latitude1),
        longitude:Number(this.state.land.Record.longitude2),
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
     >
       <Polygon
      
       coordinates= {[
        {
          latitude:Number(this.state.land.Record.latitude1),
          longitude:Number(this.state.land.Record.longitude1)
        },
        {
          latitude:Number(this.state.land.Record.latitude2),
          longitude:Number(this.state.land.Record.longitude2),
        
        },
        {
          latitude:Number(this.state.land.Record.latitude3),
          longitude:Number(this.state.land.Record.longitude3)
        },
        {
          latitude:Number(this.state.land.Record.latitude4),
          longitude:Number(this.state.land.Record.longitude4)
        }
    
       ]}
       tappable = {true}
       onPress  = {(event) => {alert(this.state.coordinates.length)}}
       fillColor = "#ccafad"
       />

<Marker
  draggable
      coordinate={{latitude:Number(this.state.land.Record.latitude1),
        longitude:Number(this.state.land.Record.longitude1)}}
      title="title"
      description= "description"
    />
     </MapView> }
     
        
     
     <View>
     <Button onPress = {() => {this.toggelMap()}}
      title = "Toggle MapView"> </Button>

       <Text> Details of the Owner:</Text>
       <Text> Name:  {this.state.land.Record.email}</Text>
           
       <Text> Previous Price: {this.state.land.Record.price} </Text>
       <Text> Area of the land: {this.state.land.Record.area} </Text>
        
     </View>
     {!this.state.requested && this.state.land.Record.requestedBy == "" && this.state.land.Record.email != this.state.email?
      <Button onPress = {() => {this.handleRequestB()
      this.setState({
        requested:true
      })}} title = "Request Buy"> </Button>:
      <Text> Already Requested or You are the owner</Text>
     }

     <Button
       title = "View History"
       onPress = {() => {
         this.setState({
           history:true
         })
       }}>
     </Button>

      { this.state.history? <Text> {JSON.stringify(this.state.landDetails)}</Text>:null }
     
      
   </ScrollView>);
  }
}