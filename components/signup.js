import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator, Modal } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

function Signup({ navigation }) {

    const [name, setName] = useState('');
    const [phone_no, setPhoneNo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [loadingModalVisible, setLoadingModalVisible] = useState(false);

    const validateAndSignup = () => {
        if (phone_no === '' || password === '' ||
            name === '' || email === '' || cpassword === '') {
            Alert.alert('Missing Details', 'Please ensure you have provided all required details!')
        } else {
            if (password === cpassword) {
                RequestSignup()
                setLoadingModalVisible(true)
            } else {
                Alert.alert('Password mismatch', 'The passwords you have provided do not match!')
            }

            // navigation.navigate('Order')
        }
    }

    const RequestSignup = async () => {
        try {
            let response = await fetch('https://micah-gas-api.herokuapp.com/signup', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    phone_no: phone_no,
                    password: password
                })
            });

            let json_response = await response.json();
            console.log(json_response)
            findNextStep(json_response)
            setLoadingModalVisible(false)

            return json_response;

        } catch (error) {
            console.error(error);
            console.log(error);
        }
    }

    const findNextStep = (json_response) => {
        if (json_response.message === "User created") {
            Alert.alert('User created', 'You are now required to login')
            navigation.navigate('Login')
        } else {
            Alert.alert('Signup failed', 'An error occured while creating an account')
        }
    }


    return (

        <KeyboardAwareScrollView
            style={{ flex: 1, backgroundColor: '#000080' }}
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={{ flexGrow: 1 }}
            scrollEnabled={false}
        >

            <View style={styles.headerContainer}>
                <Text style={{ fontFamily: 'OpenSans-Bold', color: 'white', fontSize: 23 }}>Create new account</Text>
            </View>
            <View style={styles.signupContainer}>
                <View style={styles.signupForm}>
                    <TextInput
                        placeholder='Full name'
                        style={styles.textInputs}
                        value={name}
                        onChangeText={(text) => setName(text)} />
                    <TextInput
                        placeholder='Phone Number'
                        style={styles.textInputs}
                        value={phone_no}
                        onChangeText={(text) => setPhoneNo(text)}
                        keyboardType='numeric' />
                    <TextInput
                        placeholder='Email'
                        style={styles.textInputs}
                        value={email}
                        onChangeText={(text) => setEmail(text)} />
                    <TextInput
                        placeholder='Password'
                        style={styles.textInputs}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true} />
                    <TextInput
                        placeholder='Confirm password'
                        style={styles.textInputs}
                        value={cpassword}
                        onChangeText={(text) => setCPassword(text)}
                        secureTextEntry={true} />



                    <TouchableOpacity style={styles.submitButton} onPress={() => validateAndSignup()}>
                        <Text style={{ color: "blue", fontFamily: 'OpenSans-Bold', fontSize: 20 }}>SignUp</Text>
                    </TouchableOpacity>
                </View>


                <View style={styles.footer}>
                    <Text style={[styles.loginlink, { color: 'black' }]}>
                        Already have an account?
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.loginlink}>
                            Login
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

        </KeyboardAwareScrollView>

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


export default Signup;