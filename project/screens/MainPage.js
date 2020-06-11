import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import FAB from 'react-native-fab'
import OwnedDeeds from '../screens/OwnedDeeds';
import SearchBar from '../reusables/searchbar';
import Card from '../reusables/card';
import UserProfile from './UserProfile';
import Request from './Request';
import Map from './Maps'
import { landDetails } from '../reusables/landDetail';
import { AsyncStorage } from 'react-native';

const axios = require('axios')

import BottomNavigation, {
  FullTab
} from 'react-native-material-bottom-navigation'



export default class App extends React.Component<props, state> {

  constructor(props) {
    super(props)
    this.state = {
      activeTab: 'search',
      email: props.navigation.getParam('email', 'nothing'),
      landDetails:[]
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

  async getData() {
    try {
     
      const value = await AsyncStorage.getItem('name');
      let details = JSON.parse(value);

    
    
      if (value !== null) {
        // Our data is fetched successfully
      }
    alert(JSON.stringify(details))
      this.setState({
        landDetails : details
      })
    } 
    
    catch (error) {
      alert('error')
      // Error retrieving data
    }
  }

  tabs = [
    {
      key: 'search',
      icon: 'search',
      label: 'search',
      barColor: '#364FB5',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
    {
      key: 'owned',
      icon: 'file-text',
      label: 'Owned Deeds',
      barColor: '#364FB5',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
    {
      key: 'requests',
      icon: 'arrow-down',
      label: 'Requests',
      barColor: '#364FB5',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
    {
      key: 'profile',
      icon: 'user',
      label: 'profile',
      barColor: '#364FB5',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    }
  ]

  renderIcon = icon => ({ isActive }) => (
    <Icon size={24} color="white" name={icon} />
  )

  renderTab = ({ tab, isActive }) => (
    <FullTab
      isActive={isActive}
      key={tab.key}
      label={tab.label}
      renderIcon={this.renderIcon(tab.icon)}
    />
  )

  addLandFunc = () => {
    this.props.navigation.navigate('AddLand')
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* <Header/> */}
        <View style={{ flex: 1 }}>
          {
            this.state.activeTab === 'search' ?
              <ScrollView>
                {

                  this.state.landDetails.map(land => {
                    if(land.Record.titleName)
                    return (

                      <Card land={land} onPress={() => { this.props.navigation.navigate('Maps', { email: this.state.email ,land: land}) }} />
                    );
                  })
                }

                {/* <Card onPress = {() =>{this.props.navigation.navigate('Maps')}} />
                 <Card/> */}
              </ScrollView>
              : <View></View>
          }
          {
            this.state.activeTab === 'owned' ?
              <OwnedDeeds
                addLandFunc={this.addLandFunc}
                email={this.state.email}
                land = {this.state.landDetails} />
              : <View></View>
          }
          {
            this.state.activeTab === 'requests' ?
              <Request 
                email = {this.state.email}
              />
              : <View></View>
          }
          {
            this.state.activeTab === 'profile' ?
              <UserProfile
                email = {this.state.email}
              />
              : <View></View>
          }

        </View>
        <BottomNavigation
          onTabPress={newTab => this.setState({ activeTab: newTab.key })}
          renderTab={this.renderTab}
          tabs={this.tabs}
        />
      </View>
    )
  }
}