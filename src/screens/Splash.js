import { ImageBackground, StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import LottieView from 'lottie-react-native'
import { colorTheme } from '../constant';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function App({ navigation }) {

  useEffect(() => {
    setTimeout(async () => {
      const token = await AsyncStorage.getItem("userToken");
      token
        ?
        navigation.navigate("BottomTab")
        :
        navigation.navigate("GetStarted")

      await AsyncStorage.setItem("isRoutineSurveyGiven", "false");

    }, 4000);
  }, [])

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/json/mental_splash.json')}
        autoPlay
        loop
        style={{ width: 300, height: 300 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorTheme.appBackGroundColor,
    justifyContent: 'center',
    alignItems: 'center'
  },
})