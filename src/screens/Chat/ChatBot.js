import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { mlservices } from '../../services/AIML';
import { colorTheme, grayText, blackText } from '../../constant';
import Header from '../../components/Header';
import Tts from 'react-native-tts';
import ChooseLanguageModal from '../../components/Modal/ChooseLanguageModal';
import { translate } from '../../components/translate';

export default function Message() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [typing, setTyping] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [openModal, setopenModal] = useState(false)
    const [language, setlanguage] = useState('en')


    function handleSpeakToggle(messageText) {
        Tts.setDefaultVoice('hi-in-x-hie-network');
        if (isSpeaking) {
            Tts.stop();
            setIsSpeaking(false);
        } else {
            Tts.speak(messageText, {
                androidParams: {
                    KEY_PARAM_PAN: -1,
                    KEY_PARAM_VOLUME: 0.5,
                    KEY_PARAM_STREAM: 'STREAM_MUSIC',
                },
            });
            setIsSpeaking(true);
            Tts.addEventListener('tts-finish', () => setIsSpeaking(false));
        }
    }

    function simulateTypingEffect(text) {
        let index = 0;
        let displayedText = '';

        const interval = setInterval(() => {
            if (index < text.length) {
                displayedText += text[index];
                index++;
                setMessages(prevMessages => {
                    const updatedMessages = [...prevMessages];
                    updatedMessages[updatedMessages.length - 1] = { text: displayedText, isUser: false };
                    return updatedMessages;
                });
            } else {
                clearInterval(interval);
                setTyping(false);
            }
        }, 10); // Adjust speed of typing by changing the interval duration
    }

    function MessageBox({ message }) {
        return (
            <View style={[styles.subContainer, { marginTop: 15 }]}>
                <View style={{ width: "95%", alignSelf: message.isUser ? "flex-end" : null }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ backgroundColor: message.isUser ? colorTheme.primaryColor : "white", elevation: 2, marginBottom: 2, borderRadius: 10, flexWrap: 'wrap', flex: 1 }}>
                            <View style={{ margin: 10, }}>
                                <Text style={{ color: message.isUser ? "white" : "black" }}>
                                    {message.text}
                                </Text>
                            </View>
                        </View>
                        {!message.isUser && !typing &&
                            <View style={{ marginLeft: 10 }}>
                                <MaterialIcons
                                    name={isSpeaking ? "volume-up" : "volume-off"}
                                    color={colorTheme.primaryColor}
                                    size={25}
                                    style={{ marginRight: 5 }}
                                    onPress={() => handleSpeakToggle(message.text)}
                                />
                            </View>
                        }
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center", marginTop: 5 }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Image source={require('../../assets/img/health.jpg')} resizeMode='contain' style={[styles.image, { width: 25, height: 25, marginRight: 5 }]} />
                            <Text>{message.isUser ? 'You' : 'GettaGPT'}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    function handleSend() {
        if (input.trim()) {
            const userMessage = { text: input, isUser: true };
            setMessages(prevMessages => [...prevMessages, userMessage]);
            setInput('');

            // Simulate typing effect
            setTyping(true);
            if (language === 'en') {
                mlservices.ChatBot(input).then(res => {
                    const botResponseText = res.data.response;
                    const botMessage = { text: '', isUser: false };
                    setMessages(prevMessages => [...prevMessages, botMessage]);

                    // Start typing effect after a brief delay to simulate processing time
                    setTimeout(() => {
                        simulateTypingEffect(botResponseText);
                    }, 500); // Adjust delay as needed
                });
            } else {
                translate.translateText(input, language, "en").then((textTranslated) => {
                    mlservices.ChatBot(textTranslated).then(res => {
                        const botResponseText = res.data.response;
                        const botMessage = { text: '', isUser: false };
                        setMessages(prevMessages => [...prevMessages, botMessage]);

                        // Start typing effect after a brief delay to simulate processing time
                        setTimeout(() => {
                            translate.translateText(botResponseText, "en", language).then((trans) => {
                                simulateTypingEffect(trans);
                            })
                        }, 500); // Adjust delay as needed
                    });
                })
            }
        }
    }

    return (
        <View style={styles.container}>
            {
                <ChooseLanguageModal modalVisible={openModal} setModalVisible={setopenModal} setLangage={setlanguage} />
            }
            <View style={[styles.subContainer, { flex: 0.15 }]}>
                <Header leftIconName header={'ChatBot'} textColor={'white'} titleMargin={30} />
            </View>
            <View style={styles.chatContainer}>
                <ScrollView>
                    <Text style={[styles.bigText, { margin: 10, textAlign: "center", color: grayText.color }]}>Today</Text>
                    {messages.map((message, index) => (
                        <MessageBox key={index} message={message} />
                    ))}
                </ScrollView>
                <View style={styles.textInput}>
                    <MaterialIcons name="language" color={colorTheme.primaryColor} size={25} onPress={() => setopenModal(true)} />
                    <TextInput
                        placeholder='Type Message here..'
                        onChangeText={setInput}
                        value={input}
                        style={{ width: "75%" }}
                        multiline
                    />
                    <MaterialIcons name="send" color={colorTheme.primaryColor} size={25} style={{ marginRight: 5 }} onPress={handleSend} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorTheme.primaryColor
    },
    subContainer: {
        width: "90%",
        alignSelf: 'center'
    },
    chatContainer: {
        flex: 1,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: 'white',
        paddingBottom: 60,
        paddingTop: 15
    },
    bigText: {
        fontSize: blackText.fontSize,
        color: blackText.color,
        fontWeight: blackText.fontWeight
    },
    textInput: {
        borderRadius: 10,
        backgroundColor: "white",
        padding: 0,
        borderWidth: 1,
        borderColor: colorTheme.borderColor,
        flexDirection: "row",
        alignItems: "center",
        position: "absolute",
        bottom: 0,
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-evenly",
        width:'95%'
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: colorTheme.borderColor,
        marginRight: 10,
        backgroundColor: "white"
    },
});
