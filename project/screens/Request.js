import SwipebleList from '@khorark/react-native-swipeable-flatlist';
import React from 'react'; 
import {View,Text,StyleSheet} from 'react-native';
import { AsyncStorage } from 'react-native';
import OwnCard from '../reusables/ownCard';
const axios = require('axios')



export default class Profile extends React.Component{

    componentDidMount (){
        this._getDataB();
    }

    async _getDataB() {
   
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
            landDetails: response.data
          })
    
        } catch (error) {
          alert(JSON.stringify(error))
        }
      }

    _getData = async () => {
        try{
        const value = await AsyncStorage.getItem('name');
        let details = JSON.parse(value);
      
        if (value !== null) {
          // Our data is fetched successfully
        }
      
        this.setState({
          landDetails : details
        })
    }
        catch(error){
            alert("error in getting data from localstorage")
        }
    
    }

    async updateAmount (newOwner,prevOwner,price)  {
        var landDetails = this.state.landDetails

        var newO = landDetails.findIndex(function(iterator){
            return iterator.Key == newOwner
        })

        var prevO = landDetails.findIndex(function(iterator){
            return iterator.Key == prevOwner
        })

        
      
        var amountnew = (parseInt(landDetails[newO].Record.amount) - parseInt(price)).toString()
        var amountold = (parseInt(landDetails[prevO].Record.amount) + parseInt(price)).toString()
       
        let body = {
            fcn:'createUser',
            peers:['peer0.org1.example.com','peer0.org2.example.com'],
            args: [newOwner, amountnew],
            chaincode: 'fabcar',
            channelName: 'mychannel',
        }

        let body2 = {
            fcn:'createUser',
            peers:['peer0.org1.example.com','peer0.org2.example.com'],
            args: [prevOwner, amountold],
            chaincode: 'fabcar',
            channelName: 'mychannel',
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTE4ODg3MjgsInVzZXJuYW1lIjoicHJhaGFzaXRoMTFAZ21haWwuY29tIiwicGFzc3dvcmQiOiJwdyIsImlhdCI6MTU5MTg1MjcyOH0.A1B5RB2F89sK6GylUEPOw69X0IxpXKjzeDVfBIMZ_Ds'
          }

          try{
            await axios.post('http://192.168.42.102:4000/channels/mychannel/chaincodes/fabcar',body,{
                headers:headers
            }
            )

            await axios.post('http://192.168.42.102:4000/channels/mychannel/chaincodes/fabcar',body2,{
                headers:headers
            }
            )

        }
            catch(error){
                alert(error)
            }

    }

    handleTransactionB = async (item) => {
        var title = item.Record.titleName
        var landDetails = this.state.landDetails
        var found = landDetails.findIndex(function(iterator){
            return iterator.Record.titleName == title
        })

        var newOwner = landDetails[found].Record.requestedBy
        var prevOwner = landDetails[found].Record.email

        this.updateAmount(newOwner,prevOwner,landDetails[found].Record.price)

        var email = this.state.landDetails[found].Record.requestedBy
      
        let newLand = {
            fcn:'createLand',
            peers:['peer0.org1.example.com','peer0.org2.example.com'],
            args :[this.state.landDetails[found].Record.titleName,
            email,
                this.state.landDetails[found].Record.firstName,
                this.state.landDetails[found].Record.area,
                this.state.landDetails[found].Record.address,
                this.state.landDetails[found].Record.forSale,
                this.state.landDetails[found].Record.latitude1,
                this.state.landDetails[found].Record.longitude1,
                this.state.landDetails[found].Record.latitude2,
                this.state.landDetails[found].Record.longitude2,
                this.state.landDetails[found].Record.latitude3,
                this.state.landDetails[found].Record.longitude3,
                this.state.landDetails[found].Record.latitude4,
                this.state.landDetails[found].Record.longitude4,
                "",
                this.state.landDetails[found].Record.price
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
        }
        )    
    }
        catch(error){
            alert(error)
        }
    
    
}





    handleTransaction = async (item) => {
        var title = item.titleName
        var landDetails = this.state.landDetails
        var email = this.props.email
       try{
            const value = await AsyncStorage.getItem('user')
            let users = JSON.parse(value)

            var found = landDetails.findIndex(function(iterator){
                return iterator.titleName == title
            })
            
            var newOwner = users.findIndex(function(iterator){
                return iterator.email == landDetails[found].requestedBy
            })
            //alert("hi")
            var prevOwner = users.findIndex(function(iterator){
                return iterator.email == email
            })
            
            users[newOwner].wallet = users[newOwner].wallet - landDetails[found].price
            users[prevOwner].wallet = users[prevOwner].wallet + landDetails[found].price
           
            landDetails[found].email = landDetails[found].requestedBy
            landDetails[found].requestedBy = ""

          
            

            await AsyncStorage.setItem('name',JSON.stringify(this.state.landDetails))
            await AsyncStorage.setItem('user',JSON.stringify(users))
        }
        catch(error){
            alert(error)
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            landDetails : []
        }
    }

    render() {
        return (
            <View>
                <SwipebleList
                    data={this.state.landDetails}
                    renderItem={({ item }) => (
                        item.Record.requestedBy != "" && item.Record.requestedBy != this.props.email && item.Record.titleName?
                        <View style={styles.row} key = {item.Record.title}>
                            <Text style={styles.text}>{item.Record.titleName}</Text>
                            <Text style = {styles.text}>{item.Record.requestedBy}  {item.Record.area} </Text>
                            </View>
                        :null
                    )}
                    
                    keyExtractor={(item => item.toString())}
                    leftColor={'green'}
                    rightColor={'red'}
                    onSwipeLeft={(item)=>{alert("Request has been declined....!")}}
                    onSwipeRight={(item)=>{this.handleTransactionB(item)}}
                />
                <Text> ANY NEW REQUESTS WILL BE SHOWN BELOW</Text>
                <Text></Text>
                
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    row: {
        width: '100%',
        height: 60,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
    },
    image: {
        width: 32,
        height: 32,
    },
})
