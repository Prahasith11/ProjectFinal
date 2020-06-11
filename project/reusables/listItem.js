import React from 'react'
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import LinearGradient from 'react-native-linear-gradient'; // Only if no expo

import {StyleSheet,View,Text} from 'react-native'

const list = [
    {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
    }        
]


export default class ListItem extends React.Component{

  


    render () {
        return (
            
            <LinearGradient 
     colors={['#6e45e2', '#88d3ce']}
     style = { styles.container }>

          <View>
              <Text> Hello </Text>

             <Text> HI</Text>
                   //your elements here
          </View> 
        </LinearGradient>
        );
        }

}

styles = StyleSheet.create({
    subtitleView: {
      flexDirection: 'row',
      paddingLeft: 10,
      paddingTop: 5
    },
    ratingImage: {
      height: 19.21,
      width: 100
    },
    ratingText: {
      paddingLeft: 10,
      color: 'grey'
    }
  })