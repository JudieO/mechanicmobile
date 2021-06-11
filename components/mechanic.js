// Component that shows each mechanic with their details
import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';


function Mechanic(params) {


    return (
        < View style={{ flex: 1, backgroundColor: "lightgrey", paddingBottom: 12, paddingTop: 10,flexDirection: "row" }}>
            <View style={styles.leftComponent}>
                <Text style={{ fontFamily: 'OpenSans-Bold', color: 'black', fontSize: 12 }}>Name : {params.mechanic.name}</Text>
                <Text style={{ fontFamily: 'OpenSans-Bold', color: 'black', fontSize: 12 }}>Distance Away : {params.mechanic.distance}</Text>
                <Text style={{ fontFamily: 'OpenSans-Bold', color: 'black', fontSize: 12 }}>ETA : {params.mechanic.eta}</Text>
                <Text style={{ fontFamily: 'OpenSans-Bold', color: 'black', fontSize: 12 }}>Total Orders : {params.mechanic.totalOrders}</Text>
            </View>
            <View style={styles.rightComponent}>
            <TouchableOpacity style={styles.submitButton} onPress={() => params.setData({
                        name: params.mechanic.name,
                        distance: params.mechanic.distance,
                        eta: params.mechanic.eta,
                        totalOrders: params.mechanic.totalOrders
                    })}>
                    <Text style={{ color: "blue", fontFamily: 'OpenSans-Bold', fontSize: 20 }}>
                        Request
                    </Text>
                </TouchableOpacity>
            </View>
            
        </View >

    )
}

const styles = StyleSheet.create({
    signupContainer: {
        borderRadius: 10,
        backgroundColor: 'lightgrey',
        flex: 7,
        alignItems: 'center',
        justifyContent: 'center'
    },
    leftComponent: {
        flex: 1,
        width: '70%',
        // alignItems: 'center',
        // justifyContent: 'center',
        alignSelf: 'flex-start',
    },
    rightComponent: {
        flex: 1,
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        paddingBottom: 15
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
    signupForm: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%'
    },
    footer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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


export default Mechanic;