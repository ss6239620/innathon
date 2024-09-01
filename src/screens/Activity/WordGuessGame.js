import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Animated } from 'react-native';
import { sampleWords } from '../../assets/data/WordGuessData';

const getRandomWord = () => {
    const randomPlace = Math.floor(Math.random() * sampleWords.length);
    return sampleWords[randomPlace];
};

const GFGWordGame = () => {
    const [wordData, setWordData] = useState(getRandomWord());
    const [msg, setMsg] = useState('');
    const [inputText, setInputText] = useState('');
    const [hints, setHints] = useState(3);
    const [displayWord, setDisplayWord] = useState(false);
    const [animation] = useState(new Animated.Value(0));

    const checkWordGuessedFunction = () => {
        return inputText.toLowerCase() === wordData.word.toLowerCase();
    };

    const useHint = () => {
        if (hints > 0 && !displayWord) {
            const hiddenLetterIndex = wordData.word
                .split('')
                .findIndex(
                    (letter, index) =>
                        letter !== ' ' &&
                        inputText[index] !== letter);
            if (hiddenLetterIndex !== -1) {
                const updatedText =
                    inputText.slice(0, hiddenLetterIndex) +
                    wordData.word[hiddenLetterIndex] +
                    inputText.slice(hiddenLetterIndex + 1);
                setHints(hints - 1);
                setInputText(updatedText);
            }
        }
    };

    const showResult = () => {
        if (checkWordGuessedFunction()) {
            setMsg(`Congratulations! You guessed the word correctly!`);
        } else {
            setMsg('You made a Wrong Guess. Try again!');
            setDisplayWord(true);
            startAnimation();
        }
    };

    const restartGameFunction = () => {
        setWordData(getRandomWord());
        setMsg('');
        setInputText('');
        setHints(3);
        setDisplayWord(false);
    };

    const startAnimation = () => {
        Animated.sequence([
            Animated.timing(animation, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }),
            Animated.timing(animation, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true
            })
        ]).start();
    };

    useEffect(() => {
        if (displayWord) {
            showResult();
        }
    }, [displayWord]);

    const animatedStyle = {
        opacity: animation,
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Word Guess Game</Text>
            <Text style={styles.wordDescription}>Hint: {wordData.description}</Text>
            <View style={styles.hints}>
                <Text style={styles.hintText}>Hints Remaining: {hints}</Text>
            </View>
            <TextInput
                style={styles.input}
                value={inputText}
                onChangeText={(text) => setInputText(text)}
                placeholder="Enter your guess"
                editable={!displayWord}
                autoCapitalize="none"
                autoCorrect={false}
            />
            <View style={styles.buttonSection}>
                <TouchableOpacity
                    onPress={useHint}
                    disabled={hints === 0 || displayWord}
                    style={[styles.button, styles.hintButton]}>
                    <Text style={styles.buttonText}>Use Hint</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={showResult}
                    style={[styles.button, styles.showResultButton]}
                    disabled={displayWord}>
                    <Text style={styles.buttonText}>Show Result</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={restartGameFunction}
                    style={[styles.button, styles.restartButton]}>
                    <Text style={styles.buttonText}>Restart</Text>
                </TouchableOpacity>
            </View>
            {msg && (
                <Animated.View style={[styles.message, animatedStyle]}>
                    <Text style={styles.messageText}>{msg}</Text>
                    {displayWord && <Text style={styles.correctWord}>Correct word was: {wordData.word}</Text>}
                </Animated.View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
        padding: 16,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
    },
    wordDescription: {
        fontSize: 16,
        marginVertical: 16,
        color: '#666',
    },
    hints: {
        marginVertical: 16,
    },
    hintText: {
        fontSize: 16,
        color: '#444',
    },
    buttonSection: {
        flexDirection: 'row',
        marginVertical: 16,
    },
    button: {
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    hintButton: {
        backgroundColor: 'orange',
    },
    showResultButton: {
        backgroundColor: 'green',
    },
    restartButton: {
        backgroundColor: 'red',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    message: {
        marginTop: 16,
        alignItems: 'center',
    },
    messageText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    correctWord: {
        marginTop: 8,
        fontSize: 16,
        color: '#555',
    },
    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 16,
        paddingLeft: 8,
        borderRadius: 5,
        backgroundColor: 'white',
    },
});

export default GFGWordGame;
