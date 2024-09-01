import React, { useState } from 'react';
import { FlatList, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { blackText, colorTheme, grayText } from '../../constant';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const languageData = [
    { label: 'English', value: 'en' },
    { label: 'हिंदी', value: 'hi' },
    { label: 'मराठी', value: 'mr' },
    { label: 'संस्कृत', value: 'sa' },
    { label: 'भोजपुरी', value: 'bho' },
];

const ChooseLanguageModal = ({ modalVisible, setModalVisible, setLangage }) => {
    const [selectedLanguage, setSelectedLanguage] = useState(null);

    const handleSelectLanguage = (language) => {
        setSelectedLanguage(language);
        setLangage(language);
        setModalVisible(false);
    };

    const renderLanguageItem = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.languageItem,
                item.value === selectedLanguage ? styles.selectedLanguageItem : null
            ]}
            onPress={() => handleSelectLanguage(item.value)}
        >
            <Text style={styles.languageText}>{item.label}</Text>
        </TouchableOpacity>
    );

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <Pressable style={styles.overlay} onPress={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                        <View style={styles.subContainer}>
                            <FlatList
                                data={languageData}
                                renderItem={renderLanguageItem}
                                keyExtractor={item => item.value}
                            />
                        </View>
                    <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
                        <MaterialIcons name="close" size={24} color="#000" />
                    </Pressable>
                </View>
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '95%',
        backgroundColor: colorTheme.appBackGroundColor,
        borderRadius: 10,
        alignItems: 'center',
        padding: 20,
    },
    scrollView: {
        width: '100%',
    },
    subContainer: {
        width: '100%',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    languageItem: {
        padding: 15,
        borderRadius: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: colorTheme.borderColor,
    },
    selectedLanguageItem: {
        borderColor: colorTheme.primaryColor,
        borderWidth: 2,
    },
    languageText: {
        fontSize: blackText.fontSize,
        color: blackText.color,
    },
});

export default ChooseLanguageModal;
