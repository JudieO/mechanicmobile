import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Picker, Alert, Modal, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';
//import Picker from '@react-native-community/picker';
import formatDateTimes from './utilities/formatdatetimes';
import isDateTimeBefore from './utilities/isDateTimeBefore';



navigator.geolocation = require('@react-native-community/geolocation');

export default function Placement(props) {

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;

    const [order_type, setOrderType] = useState('none');
    const [brand, setBrand] = useState('none');
    const [size, setSize] = useState('none');
    const [region, setRegion] = useState('none');
    const [apartment, onChangeApartment] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [modalVisible, setModalVisible] = useState(false);
    const [loadingModalVisible, setLoadingModalVisible] = useState(false);

    const [location, setLocation] = useState({ lat: null, lng: null })
    const [deliveryNow, setDeliveryNow] = useState(true);
    const [del_date_time, setDelDateTime] = useState(new Date()); // Uses the current datetime
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [price, setPrice] = useState('')

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
        // this.setState({error: err.message});
        // console.log(err)
        console.warn(err)

    };

    const placeOrder = async () => {
        setLoadingModalVisible(true)
        try {
            let response = await fetch('https://micah-gas-api.herokuapp.com/api/orders', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: props.name,
                    phone_no: props.phone_no,
                    date_time: formatDateTimes(isDateTimeBefore(new Date(), del_date_time)),
                    order_type: order_type,
                    brand: brand,
                    size: size,
                    location: {
                        gate_region: region,
                        apartment: apartment,
                        coordinates: `lat${location.lat} lng${location.lng}`
                    }
                })
            });
            let json_response = await response.json();
            setLoadingModalVisible(false)
            console.log(json_response)
            confirmPlacementToUser()
            return json_response;

        } catch (error) {
            console.error(error);
            console.log(error);
        }
    }

    const onTimeChange = (event, selectedDate) => {
        const currentDate = selectedDate || del_date_time;
        setDelDateTime(currentDate);
        setShowTimePicker(false)
        setDeliveryNow(false)
        console.log(`The newly set del time is ${formatDateTimes(del_date_time)}`)
    };

    const toggleDeliveryNow = (value) => {
        if (value === true) {
            value = false
        } else {
            value = true
            // del_date_time = new Date()
            setDelDateTime(new Date())
        }
        return value;
    }

    const validateFields = () => {
        if (order_type === "none" || brand === "none" || size === "none" ||
            apartment === '' || region === "none") {
            Alert.alert('Missing Details', 'Please submit all the required details!')

        } else {
            fetchPrice()
            setModalVisible(true)
        }
    }

    const confirmPlacementToUser = () => {
        Alert.alert(
            'Order Placed',
            'Thank you for placing your order',
            [
                { text: 'OK', onPress: () => clearData() }
            ]
        );
    }

    const clearData = () => {
        setOrderType('none');
        setBrand('none');
        setSize('none');
        setRegion('none');
        onChangeApartment('');
        setModalVisible(false);
        setDeliveryNow(true);
    }

    const fetchPrice = async () => {
        try {
            let response = await fetch('https://micah-gas-api.herokuapp.com/api/get_price', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    order_type: order_type,
                    brand: brand,
                    size: size
                })
            });

            let json_response = await response.json();
            setPrice(json_response.price)

            return json_response;

        } catch (error) {
            console.error(error);
            console.log(error);
        }
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



                <Text style={styles.welcomeText}> Hello {props.name}, place your order:</Text>

                <Picker selectedValue={order_type}
                    onValueChange={(item_value) => setOrderType(item_value)}
                    style={{ borderColor: 'red', borderRadius: 10, borderWidth: 1 }}>
                    <Picker.Item label="Order Type" value="none" />
                    <Picker.Item label="Purchase" value="purchase" />
                    <Picker.Item label="Refill" value="refill" />
                </Picker>

                <Picker selectedValue={brand}
                    onValueChange={(item_value) => setBrand(item_value)}
                    style={{ borderColor: 'red', borderRadius: 10, borderWidth: 1 }}>
                    <Picker.Item label="Brand" value="none" />
                    <Picker.Item label="Total" value="total" />
                    <Picker.Item label="K-Gas" value="k-gas" />
                    <Picker.Item label="Afrigas" value="afrigas" />
                    <Picker.Item label="Hass" value="hass" />
                    <Picker.Item label="Pro-Gas" value="pro-gas" />
                    <Picker.Item label="Other" value="other" />
                </Picker>

                <Picker selectedValue={size}
                    onValueChange={(item_value) => setSize(item_value)}
                    style={{ borderColor: 'red', borderRadius: 10, borderWidth: 1 }}>
                    <Picker.Item label="Size" value="none" />
                    <Picker.Item label="3kg" value="3kg" />
                    <Picker.Item label="6kg" value="6kg" />
                    <Picker.Item label="13kg" value="13kg" />
                </Picker>

                <Picker selectedValue={region}
                    onValueChange={(item_value) => setRegion(item_value)}
                    style={{ borderColor: 'red', borderRadius: 10, borderWidth: 1 }}>
                    <Picker.Item label="Gate/Region" value="none" />
                    <Picker.Item label="Gate A" value="gateA" />
                    <Picker.Item label="Gate B" value="gateB" />
                    <Picker.Item label="Gate C" value="gateC" />
                    <Picker.Item label="Gate D" value="gateD" />
                    <Picker.Item label="Highway" value="highway" />
                    <Picker.Item label="Sewage" value="sewage" />
                    <Picker.Item label="Posta Area" value="posta" />
                    <Picker.Item label="Oasis" value="oasis" />
                </Picker>

                <TextInput
                    style={styles.apartment_field}
                    onChangeText={text => onChangeApartment(text)}
                    value={apartment}
                    placeholder="Apartment"
                />

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingLeft: 10,
                    paddingRight: 10
                }}>
                    <View>
                        <Text style={{ fontSize: 18 }}>
                            Delivery time:    Now
                    <CheckBox
                                value={deliveryNow}
                                onValueChange={() => setDeliveryNow(toggleDeliveryNow(deliveryNow))}
                                style={styles.checkbox}

                            />
                        or
                    </Text>

                    </View>

                    <View style={{ paddingTop: 12, paddingLeft: 40 }}>
                        <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                            <Text style={{ fontSize: 18, color: 'blue' }}>
                                Later
                        </Text>
                        </TouchableOpacity>
                    </View>

                </View>

                <Picker selectedValue={paymentMethod}
                    onValueChange={(item_value) => setPaymentMethod(item_value)}
                    style={{ marginTop: 20, borderColor: 'red', borderRadius: 10, borderWidth: 1 }}>
                    <Picker.Item label="Cash" value="cash" />
                    <Picker.Item label="M-PESA" value="mpesa" />
                </Picker>

                <View>
                    {showTimePicker && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={del_date_time}
                            mode='time'
                            is24Hour={true}
                            display="default"
                            onChange={onTimeChange}
                            onCancel={() => setShowTimePicker(false)}
                        />
                    )}
                </View>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity style={styles.submitButton} onPress={() => validateFields()}>
                        <Text style={{ color: "white", fontFamily: 'OpenSans-Bold', fontSize: 16 }}>Submit Order</Text>
                    </TouchableOpacity>
                </View>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 20 }}>Please confirm the order details you have provided</Text>
                            <Text style={styles.modalText}>Order Type:  {order_type} </Text>
                            <Text style={styles.modalText}>Brand:  {brand}</Text>
                            <Text style={styles.modalText}>Size:  {size}</Text>
                            <Text style={styles.modalText}>Apartment:  {apartment}</Text>
                            <Text style={styles.modalText}>Delivery Time:  {formatDateTimes(del_date_time)}</Text>
                            <Text style={styles.modalText}>Payment mode:  {paymentMethod}</Text>
                            <Text style={styles.modalText}>Amount:  {price}</Text>

                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity style={styles.submitButton} onPress={() => placeOrder()}>
                                        <Text style={{ color: "white", fontWeight: 'bold', fontSize: 16 }}>Place Order</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity style={[styles.submitButton, { backgroundColor: 'blue' }]} onPress={() => setModalVisible(false)}>
                                        <Text style={{ color: "white", fontWeight: 'bold', fontSize: 16 }}>Edit Order</Text>
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
