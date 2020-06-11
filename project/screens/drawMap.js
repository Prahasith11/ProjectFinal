import MapView, { PROVIDER_GOOGLE, Polygon, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { Button } from 'native-base';

const styles = StyleSheet.create({
    container: {
        height: 600,
        width: 400,

    },
    map: {
        height: 800,
        width: 500
    },
});

export default class Maps extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            markers: [
                // {
                //     latitude: 17.966146,
                //     longitude: 79.597425
                // },
                // {
                //     latitude: 17.966088,
                //     longitude: 79.597428,

                // },
                // {
                //     latitude: 17.966081,
                //     longitude: 79.597297
                // },
                // {
                //     latitude: 17.966146,
                //     longitude: 79.597289
                // }

            ],
            region: [{
                latitude: 18.966146,
                longitude: 79.597425,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            }],
            marker: {
                latitude: 18.966146,
                longitude: 79.597425,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            },
            showPolygon: false
        }
    }

    plotMap = (event) => {
        let position = {
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude
        }
        alert(JSON.stringify(this.state.markers))

        //var tempArray = this.state.markers
        this.state.markers.push(position)
        this.setState = {
            showPolygon: false
        }
    }

    render() {
        return (
            <View>
                <ScrollView style={styles.container}>
                    <MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styles.map}
                        onPress={(event) => {
                            this.plotMap(event)
                        }}
                        region={{
                            latitude: 17.966146,
                            longitude: 79.597425,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                        }}
                    >
                        {/* <Polygon
                           
                            coordinates={this.state.markers}
                            tappable={true}
                            onPress={(event) => { alert(event.nativeEvent.latitude) }}
                            fillColor="#ccafad"
                        />  */}
                       


                        {this.state.markers.map(marker => (

                            <Marker
                                key={marker}
                                coordinate={marker}
                                title="title"
                                description="description"
                            />


                        )
                        )
                        }

                    </MapView>



                </ScrollView>

                <View style={{ paddingTop: 10 }}>
                    <Button
                        title="done">
                    </Button>
                </View>
            </View>
        );
    }
}