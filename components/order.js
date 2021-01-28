import React from 'react';
import { View, Text } from 'react-native';
import Placement from './placement';

function Order({ route }) {
    const name = route.params.user;
    const phone_no = route.params.phone_no;

    return (
        < View style={{ flex: 1, backgroundColor: "#000080" }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' /*height: 40*/ }}>
                <Text style={{ fontFamily: 'OpenSans-Bold', color: 'white', fontSize: 23 }}>Order placement page</Text>
            </View>
            <View style={{ flex: 7, alignItems: 'center', justifyContent: 'center' }}>
                <Placement name={name} phone_no={phone_no} />
            </View>
        </View >

    )
}

export default Order;