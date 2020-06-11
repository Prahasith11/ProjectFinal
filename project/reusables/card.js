import { PricingCard } from 'react-native-elements';
import React from 'react';


export default class Card extends React.Component{


    render(){
        return(
        <PricingCard
        color="#4f9deb"
        title={this.props.land.Record.titleName}
        price="$1440"
        info={[this.props.land.Record.firstName, this.props.land.Record.area,this.props.land.Record.address]}
        button={{ title: 'Check', icon: 'flight-takeoff' }}
        onButtonPress = {this.props.onPress}
    />);
    }
}