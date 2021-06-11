import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Picker, Alert, Modal, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';
//import Picker from '@react-native-community/picker';
import formatDateTimes from './utilities/formatdatetimes';
import isDateTimeBefore from './utilities/isDateTimeBefore';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Placement } from './placement';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { mechanics } from '../data';



navigator.geolocation = require('@react-native-community/geolocation');

const Tab = createBottomTabNavigator();

export default function showMap({ navigation }) {

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;


    const [location, setLocation] = useState({ lat: null, lng: null })
    const [loadingModalVisible, setLoadingModalVisible] = useState(false);

    useEffect(() => {
        fetchLocation();
    }, []);

    const geoOptions = {
        enableHighAccuracy: true,
        timeOut: 20000
    };

    const fetchLocation = () => {

        navigator.geolocation.getCurrentPosition(geoSuccess, geoFailure, geoOptions);

    }
    const geoSuccess = (position) => {

        setLocation({ lat: position.coords.latitude, lng: position.coords.longitude })

    };
    const geoFailure = (err) => {
        console.warn(err)

    };



    return (
        < View style={{ flex: 1, backgroundColor: "#000080" }}>
        
        <View style={styles.signupContainer}>
            <View style={styles.container}>

                {/* Add the mapview here */}
                {/* <MapView style={{ ...StyleSheet.absoluteFillObject }}> 
                </MapView> */}
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={{
                    latitude: -1.1018,
                    longitude: 37.0144,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                    }}
                    showsUserLocation={true}
                >

                    { mechanics.map((mechanic) => ( 
                        <Marker
                        key={mechanic.markerKey}
                        coordinate={mechanic.coordinate}
                        title={mechanic.name}
                        description={mechanic.name}
                        />
                     )) }

                    
                </MapView>
            </View>


            <View style={styles.footer}>
                {/** Change navigate to to the orderring component */}
                <TouchableOpacity style={styles.submitButton} onPress={() => navigation.navigate('requestMechanic', {
                                                                                                    name: "Judie"
                                                                                                })}>
                    <Text style={{ color: "blue", fontFamily: 'OpenSans-Bold', fontSize: 20 }}>
                        Request Mechanic
                </Text>
                </TouchableOpacity>

            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={loadingModalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        
                        <ActivityIndicator size="large" color="#00ff00" />

                    </View>
                </View>
            </Modal>

        </View>
    </View >
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 700,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
    map: {
    ...StyleSheet.absoluteFillObject,
    },
    signupContainer: {
        borderRadius: 10,
        backgroundColor: 'lightgrey',
        flex: 7,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInputs: {
        width: '80%',
        marginTop: 20,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "grey",
        borderRadius: 25,
        paddingLeft: 20
    },
    submitButton: {
        marginTop: 30,
        alignItems: 'center'
    },
    mapView: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%'
    },
    footer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 450
    },
    loginlink: {
        color: 'blue',
        fontFamily: 'OpenSans-Regular',
        fontSize: 16
    },
    modalView: {
        borderRadius: 20,
        alignItems: "center"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },


});

