import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { blackText, blueText, colorTheme, grayText } from '../../constant';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { userServices } from '../../services/userAuth';
import { BlogServices } from '../../services/BlogsServices';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RoutineSurveyModal = ({ modalVisible, setModalVisible }) => {
    const [text, setText] = useState('');
    const [height, setHeight] = useState(0);
    const [selectedEmotion, setSelectedEmotion] = useState(null);
    const [emoji, setemoji] = useState('')

    function fetchSenti(params) {
        BlogServices.fetchmysentiments().then(async (res) => {
          console.log(res.data);
          await AsyncStorage.setItem('sentiment', res.data);
        })
      }

    const emotions = [
        { emoji: '😊', label: 'Happy' },
        { emoji: '😢', label: 'Sad' },
        { emoji: '😄', label: 'Excited' },
        { emoji: '😡', label: 'Angry' },
        { emoji: '😖', label: 'Frustrated' },
    ];

    function handleClick(index, emotion) {
        setSelectedEmotion(index)
        setemoji(emotion.label)
    }

    function handleSubmit() {
        userServices.RoutineSurvey(emoji, text).then(() => {
            fetchSenti()
            setModalVisible(!modalVisible)
        })
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            <Pressable style={styles.overlay} onPress={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <Pressable style={styles.modalContainer} onPress={() => { }}>
                        <ScrollView style={styles.scrollView}>
                            <View style={styles.subContainer}>
                                <Text style={styles.bigText}>How do you feel?</Text>
                                <View style={styles.emotionContainer}>
                                    {emotions.map((emotion, index) => (
                                        <Pressable
                                            key={index}
                                            style={[
                                                styles.emotionItem,
                                                selectedEmotion === index && styles.selectedEmotionItem, // Apply border if selected
                                            ]}
                                            onPress={() => handleClick(index, emotion)}>
                                            <Text style={styles.emotionText}>{emotion.emoji}</Text>
                                            <Text>{emotion.label}</Text>
                                        </Pressable>
                                    ))}
                                </View>
                                <View style={styles.textInputContainer}>
                                    <TextInput
                                        multiline={true}
                                        onChangeText={(text) => setText(text)}
                                        onContentSizeChange={(event) =>
                                            setHeight(event.nativeEvent.contentSize.height)
                                        }
                                        placeholder="About Yourself?"
                                        style={[styles.textInput, { height: Math.max(35, height) }]}
                                        value={text}
                                    />
                                </View>
                                <TouchableOpacity
                                    style={{ backgroundColor: colorTheme.primaryColor, padding: 15, width: '100%', borderRadius: 50, justifyContent: "center", marginTop: 30 }}
                                    onPress={() => handleSubmit()}
                                >
                                    <Text style={[styles.smallText, { color: "white", alignSelf: 'center' }]}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </Pressable>
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
    },
    scrollView: {
        width: '100%',
        paddingVertical: 20,
    },
    subContainer: {
        width: '100%',
        alignSelf: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    emotionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginVertical: 20,
        marginBottom: 40,
        width: '100%',
        alignSelf: 'center',
        paddingHorizontal: 10
    },
    emotionItem: {
        alignItems: 'center',
        marginHorizontal: 10,
        paddingVertical: 5, // Adjusted padding to reduce border overflow
        paddingHorizontal: 8, // Adjusted padding to reduce border overflow
        borderRadius: 10,
    },
    selectedEmotionItem: {
        borderColor: colorTheme.primaryColor,
        borderWidth: 2,
    },
    emotionText: {
        fontSize: 30,
    },
    bigText: {
        fontSize: blackText.fontSize,
        color: blackText.color,
        fontWeight: blackText.fontWeight,
    },
    textInputContainer: {
        borderWidth: 1,
        borderColor: colorTheme.borderColor,
        borderRadius: 5,
        paddingHorizontal: 4,
        paddingVertical: 10,
    },
    textInput: {
        fontSize: grayText.fontSize,
        color: grayText.color,
    },
});

export default RoutineSurveyModal;
