import { ImageBackground, StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import LottieView from 'lottie-react-native'
import { colorTheme } from '../constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlogServices } from '../services/BlogsServices';



export default function App({ navigation }) {

  function fetchSenti(params) {
    BlogServices.fetchmysentiments().then(async (res) => {
      console.log(res.data);
      await AsyncStorage.setItem('sentiment', res.data);
    })
  }

  function handleAlreadyLogin(params) {
    fetchSenti()
    navigation.navigate("BottomTab")
  }

  useEffect(() => {
    setTimeout(async () => {
      const token = await AsyncStorage.getItem("userToken");
      token
        ?
        handleAlreadyLogin()
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