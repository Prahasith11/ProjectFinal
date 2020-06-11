import React from 'react';
import { TouchableOpacity } from 'react-native';
import GradientCard from 'react-native-gradient-card-view';


export default class OwnCard extends React.Component{
    render(){
return(
<TouchableOpacity activeOpacity={1} onPress={() => { alert("hi") }}>
            <GradientCard
              style={{ marginTop: 16 }}
              outerContainer={{ height: 100, marginLeft: 5, marginRight: 5, borderRadius: 20 }}
              title={this.props.details.Record.titleName}
              subtitle={"Wgl"}
              gradientColors={["#ff6f61", "orange"]}
              centerTitle={this.props.details.Record.price}
              centerSubtitle={"Value"}
              centerSubtitleStyle={{
                fontSize: 12,
                marginLeft: 8,
                textAlign: "center",
                color: "blue"
              }}

            />
          </TouchableOpacity>);
    }
            }