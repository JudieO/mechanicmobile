import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Picker, Alert, Modal, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';
//import Picker from '@react-native-community/picker';
import formatDateTimes from './utilities/formatdatetimes';
import isDateTimeBefore from './utilities/isDateTimeBefore';
import Mechanic from './mechanic';
import { mechanics } from '../data';




navigator.geolocation = require('@react-native-community/geolocation');

export default function requestMechanic(props) {

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;


    const [location, setLocation] = useState({ lat: null, lng: null })
    const [descriptionModalVisible, setDescriptionModalVisible] = useState(false);
    const [placementModalVisible, setPlacementModalVisible] = useState(false);
    const [orderModalVisible, setOrderModalVisible] = useState(false);
    
    const [loadingModalVisible, setLoadingModalVisible] = useState(false);

    const [name, setMechanicName] = useState("");
    const [distanceAway, setDistanceAway] = useState(0);
    const [eta, setEta] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [description, setDescription] = useState("");

    

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

    const showOrderSummary = () => {
        setDescriptionModalVisible(false)
        setPlacementModalVisible(true)
    }

    const setData = (data) => {
        setMechanicName(data.name)
        setDistanceAway(data.distance)
        setEta(data.eta)
        setTotalOrders(data.totalOrders)
        setDescriptionModalVisible(true)
    }

    const placeOrder = () => {
        setLoadingModalVisible(true)
        setTimeout(function(){ 
            setLoadingModalVisible(false); 
            setOrderModalVisible(true);
        }, 4000);
    }

    
    const exitModals = () => {
        setPlacementModalVisible(false)
        setOrderModalVisible(false)
        setDescriptionModalVisible(false)
        setDescription("")
        setMechanicName("")
        setDistanceAway("")
        setEta("")
        setTotalOrders("")
    }

    

    return (
        <View style={{
            // height: 700,
            flex: 1,
            padding: 20,
            backgroundColor: 'lightgrey',
            borderRadius: 16,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <ScrollView>



                <Text style={styles.welcomeText}> Hello {props.name}, select the mechanic:</Text>

                { mechanics.map((mechanic) => (<Mechanic setData={setData} mechanic={mechanic}/>)) }
                
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={placementModalVisible}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 20 }}>Please confirm the request details you have provided</Text>
                            <Text style={styles.modalText}>Name:  {name} </Text>
                            <Text style={styles.modalText}>Distance Away:  {distanceAway}</Text>
                            <Text style={styles.modalText}>ETA:  {eta}</Text>
                            <Text style={styles.modalText}>Total Orders:  {totalOrders}</Text>
                            <Text style={styles.modalText}>Description:  {description}</Text>
                    
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity style={styles.submitButton} onPress={() => placeOrder()}>
                                        <Text style={{ color: "white", fontWeight: 'bold', fontSize: 16 }}>Place Order</Text>
                                    </TouchableOpacity>
                                </View>
                                
                            </View>

                        </View>
                    </View>
                </Modal>
                {/** Modal for entering the description */}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={descriptionModalVisible}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.descrmodalView}>
                            <TextInput
                            placeholder='Description'
                            style={styles.textInputs}
                            value={description}
                            onChangeText={(text) => setDescription(text)}
                            keyboardType='default' />

                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity style={styles.submitButton} onPress={() => showOrderSummary()}>
                                        <Text style={{ color: "white", fontWeight: 'bold', fontSize: 16 }}>Confirm Order</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={loadingModalVisible}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.loadingModalView}>

                            <ActivityIndicator size="large" color="#00ff00" />

                        </View>
                    </View>
                </Modal>
                {/** The modal below is for the full order that shows the order that has been placed */}

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={orderModalVisible}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 20 }}>You have requested for a mechanic. {name} will call you on arrival</Text>
                            <Text style={styles.modalText}>Name:  {name} </Text>
                            <Text style={styles.modalText}>Distance Away:  {distanceAway}</Text>
                            <Text style={styles.modalText}>ETA:  {eta}</Text>
                            <Text style={styles.modalText}>Total Orders:  {totalOrders}</Text>
                            <Text style={styles.modalText}>Description:  {description}</Text>
                    
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity style={styles.submitButton} onPress={() => exitModals()}>
                                        <Text style={{ color: "white", fontWeight: 'bold', fontSize: 16 }}>Close</Text>
                                    </TouchableOpacity>
                                </View>
                                
                            </View>

                        </View>
                    </View>
                </Modal>


            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    apartment_field: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20
    },
    welcomeText: {
        color: 'black',
        fontSize: 20,
        marginBottom: 30,
        fontFamily: 'OpenSans-Regular'
    },
    textInputs: {
        width: '100%',
        marginTop: 20,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "grey",
        borderRadius: 25,
        paddingLeft: 20
    },
    submitButton: {
        marginTop: 20,
        padding: 5,
        backgroundColor: "green",
        borderRadius: 8,
        alignItems: 'center'
    },
    checkbox: {
        marginLeft: 30,
        alignSelf: "center"
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    descrmodalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 20,
        textAlign: "center",
        fontSize: 15,
        fontWeight: '400'
    },
    modalTextRight: {
        marginBottom: 15,
        textAlign: "right"

    },
    loadingModalView: {
        borderRadius: 20,
        alignItems: "center"
    },

});
