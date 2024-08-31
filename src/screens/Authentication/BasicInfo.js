import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colorTheme, blackText, blueText, grayText } from '../../constant'
import Header from '../../components/Header'
import DropDownNormalTextInput from '../../components/TextInputs/DropDownNormalTextInput'
import { genderData, maritalStatusData, professionalData } from '../../assets/data/dropDownData'
import { userServices } from '../../services/userAuth'

export default function BasicInfo() {
  const [age, setage] = useState('')
  const [gender, setgender] = useState('')
  const [maritalStatus, setMaritalStatus] = useState('')
  const [about, setAbout] = useState('')
  const [Proffession, setProffession] = useState('')

  function handleSubmit(params) {
    userServices.BasicInfoForm(age, gender, maritalStatus, Proffession,about)
  }
  return (
    <ScrollView style={styles.container}>
      <View style={[styles.subContainer, { flex: 1.5 }]}>
        <Header header={'Basic Info'} titleMargin={30} />
        <View style={{ marginBottom: 20 }}>
          <Text style={[styles.smallText, { color: 'black', marginBottom: 5 }]}>Age</Text>
          <View style={styles.textInput}>
            <TextInput
              placeholder='18'
              onChangeText={(text) => setage(text)}
              value={age}
              inputMode='numeric'
              style={{ paddingHorizontal: 15 }}
            />
          </View>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={[styles.smallText, { color: 'black', marginBottom: 5 }]}>Gender</Text>
          <DropDownNormalTextInput placeholder={'Gender'} data={genderData} setValue={setgender} value={gender} />
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={[styles.smallText, { color: 'black', marginBottom: 5 }]}>Proffession</Text>
          <DropDownNormalTextInput placeholder={'Proffession'} data={professionalData} setValue={setProffession} value={Proffession}search />
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={[styles.smallText, { color: 'black', marginBottom: 5 }]}>Marital Status</Text>
          <DropDownNormalTextInput placeholder={'Marital Status'} data={maritalStatusData} setValue={setMaritalStatus} value={maritalStatus} />
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={[styles.smallText, { color: 'black', marginBottom: 5 }]}>About Yourself</Text>
          <View style={[styles.textInput, { height: 150, marginTop: 5 }]}>
            <TextInput
              placeholder='Myself...'
              onChangeText={(text) => setAbout(text)}
              value={about}
              style={{ padding: 0, paddingHorizontal: 15 }}
            />
          </View>
        </View>
      </View>
      <View style={[{ flex: 1, justifyContent: 'flex-end' }, styles.subContainer]}>
        <TouchableOpacity
          style={{ backgroundColor: colorTheme.primaryColor, padding: 15, width: '100%', borderRadius: 50, justifyContent: "center", }}
          onPress={() => handleSubmit()}
        >
          <Text style={[styles.smallText, { color: "white", alignSelf: 'center' }]}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorTheme.appBackGroundColor,
  },
  subContainer: {
    width: "90%",
    height: "auto",
    alignSelf: "center",
    // backgroundColor:"red"
  },
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
  textInput: {
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#d3d2d6",
    textAlignVertical: 'top',
    padding: 0
  },
})