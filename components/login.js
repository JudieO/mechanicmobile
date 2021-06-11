import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet, TextInput, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { users } from '../data';

function Login({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loadingModalVisible, setLoadingModalVisible] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);


    const validateAndLogin = () => {
        if (email === '' || password === '') {
            Alert.alert('Missing Details', 'Please ensure you have provided the phone number and the password!')
        } else {
            setLoadingModalVisible(true)
            requestLogin()
            
        }
    }

    const requestLogin = () => {
        //if details exist
        users.map((user) => {
            if (user.email == email && user.password == password){
                setAuthenticated(true)
                setTimeout(function(){ 
                    setLoadingModalVisible(false);
                    navigation.navigate('Map')
                }, 3000);
            }else{
                Alert.alert('Login failed', 'Invalid email and password combination')
                setTimeout(function(){ 
                    setLoadingModalVisible(false);
                }, 3000);
            }
        })

        
    }

    const RequestLogin = async () => {
        try {
            let response = await fetch('https://judy-mechanic-api.herokuapp.com/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            let json_response = await response.json();

            findNextStep(json_response)
            setLoadingModalVisible(false)

            return json_response;
            findNext()

        } catch (error) {
            console.error(error);
            console.log(error);
        }
    }

    const findNextStep = (json_response) => {
        if (json_response.success) {

            navigation.navigate('Map', {
                user: json_response.name,
                email: email
            })
        } else {
            Alert.alert('Login failed', 'Invalid phone number and password combination')
        }
    }

    const findNext = () => {
        navigation.navigate('Map')
    }


    return (
        < View style={{ flex: 1, backgroundColor: "#000080" }}>
            <View style={styles.headerContainer}>
                <Text style={{ fontFamily: 'OpenSans-Bold', color: 'white', fontSize: 23 }}>Sign In</Text>
            </View>
            <View style={styles.signupContainer}>
                <View style={styles.signupForm}>

                    <TextInput
                        placeholder='Email'
                        style={styles.textInputs}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        keyboardType='default' />

                    <TextInput
                        placeholder='Password'
                        style={styles.textInputs}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true} />

                    <TouchableOpacity style={styles.submitButton} onPress={() =>
                        validateAndLogin()}>
                        <Text style={{ color: "blue", fontFamily: 'OpenSans-Bold', fontSize: 20 }}>Login</Text>
                    </TouchableOpacity>
                </View>


                <View style={styles.footer}>
                    <Text style={[styles.loginlink, { color: 'black' }]}>
                        Don't have an account?
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text style={styles.loginlink}>
                            Sign up
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


export default Login;
