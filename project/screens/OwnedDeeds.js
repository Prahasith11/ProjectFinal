import GradientCard from 'react-native-gradient-card-view';
import React from 'react';
import { ScrollView, View, Button, Text, TouchableOpacity, TouchableWithoutFeedback, TouchableWithoutFeedbackComponent, TouchableHighlight } from 'react-native';
import { FloatingAction } from "react-native-floating-action";
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios';
import OwnCard from '../reusables/ownCard';

const actions = [
  {
    text: "Add",

    name: "bt_accessibility",
    position: 2
  },
  {
    text: "Update",

    name: "bt_language",
    position: 1
  },
  {
    text: "Delete",

    name: "bt_room",
    position: 3
  },
  {
    text: "Video",

    name: "bt_videocam",
    position: 4
  }
];

export default class Gradientcard extends React.Component<state,props> {

  constructor(props) {
    super(props)
  }

  addLand = async (event) => {

    const landDetails = {
      area: "250",
      price: "2450",
      forSale: "true"
    }

    let response = await axios.post('http://192.168.42.102:3001/addLand',landDetails)
    if(response.data === "added"){
      alert("land details updated successfully")
    }
    else{
      alert("OH no!")
    }

  }

  render() {
    return (
      <View>
        <ScrollView >
          


      {this.props.land.map(land => {
        return(
          land.Record.email == this.props.email?
          <OwnCard
            details = {land}
          ></OwnCard>:null
        )
      })}
     



        </ScrollView>

        <Button
          title="Add"
          length={40}
          width={40}
          onPress={this.props.addLandFunc}
        />
        
      </View>




    );
  }
}
