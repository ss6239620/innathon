import React from 'react';
import { View, Text, StyleSheet, Modal, Pressable, Alert, TouchableOpacity } from 'react-native';
import { blackText, blueText, colorTheme, grayText } from '../../constant';
import { navigate } from '../../services/navRef';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = ({ modalVisible, setModalVisible }) => {
    // const [close, setclose] = useState(second)
    async function handleLogout(params) {
        await AsyncStorage.removeItem("userToken")
        navigate('GetStarted')
    }
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
                <Pressable style={styles.backdrop} onPress={() => { setModalVisible(false) }} />
                <View style={{ backgroundColor: 'rgba(52, 52, 52, 0.8)' }}>
                    <View style={styles.modalView}>
                        <View style={{ borderColor: colorTheme.borderColor, borderWidth: 2, width: '40%', borderRadius: 40, alignSelf: 'center' }} />
                        <Text style={[styles.bigText, { fontSize: 19, fontWeight: 'bold', marginTop: 15, textAlign: 'center' }]}>Logout</Text>
                        <View style={{ borderColor: colorTheme.borderColor, borderWidth: 0.5, width: '90%', marginVertical: 15, alignSelf: 'center' }} />
                        <Text style={[styles.smallText, { fontWeight: 'bold', textAlign: 'center' }]}>Are you sure you want to log out?</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 20 }}>
                            <TouchableOpacity style={{ backgroundColor: "white", borderWidth: 1, borderColor: colorTheme.primaryColor, borderRadius: 50 }}>
                                <Text style={[styles.blueText, { paddingHorizontal: 45, paddingVertical: 10,color:"gray" }]}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleLogout}
                                style={{ backgroundColor: colorTheme.primaryColor, borderRadius: 50 }}>
                                <Text style={[styles.blueText, { color: "white", paddingHorizontal: 30, paddingVertical: 10 }]}>Yes,Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    bigText: {
        fontSize: blackText.fontSize,
        color: blackText.color,
        fontWeight: blackText.fontWeight
    },
    smallText: {
        fontSize: grayText.fontSize,
        color: grayText.color,
        fontWeight: grayText.fontWeight
    },
    blueText: {
        fontSize: blueText.fontSize,
        color: blueText.color,
        fontWeight: blueText.fontWeight
    },
    centeredView: {
        flex: 1,
        justifyContent: 'space-between',
        // alignItems: 'center',
        // marginTop: 22,
    },
    backdrop: {
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        // width: '100%',
        // height:"75%"
        flexGrow: 1
    },
    modalView: {
        backgroundColor: 'white',
        borderTopEndRadius: 20,
        borderTopLeftRadius: 20,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default App;