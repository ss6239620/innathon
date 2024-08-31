import { Clipboard, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function QuoteOfTheDay() {
    const [quote, setQuote] = useState("");
    useEffect(() => {
        fetchQuoteFunction();
    }, []);
    const fetchQuoteFunction = async () => {
        try {
            const res = await axios.get("https://zenquotes.io/api/today");
            const quo = res.data[0].q;
            
            await AsyncStorage.setItem("lastQuote", quo);
            setQuote(quo);
        } catch (error) {
            console.error("Error fetching quotes:", error.message);
        }
    };
    return (
        <View>
            <Text style={[styles.bigText, { color: 'black', textAlign: 'left', marginTop: 10, fontSize: 23, fontWeight: '600' }]}>Quote of the day</Text>
            <View style={{ backgroundColor: '#face1b', marginTop: 8, alignItems: 'center', justifyContent: 'center', borderRadius: 30 }}>
                <Text style={[styles.smallText, { color: 'black', paddingVertical: 10, paddingHorizontal: 7, textAlign: 'center' }]}>{quote}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})