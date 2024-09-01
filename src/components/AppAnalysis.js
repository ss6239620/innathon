import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colorTheme, blackText, blueText, grayText } from '../constant';
import { PieChart } from "react-native-gifted-charts";
import Header from './Header';
import RNSpeedometer from 'react-native-speedometer';
import { NativeModules } from 'react-native';
import { filterAppUsage } from '../components/FilterAppUsageData';
import { speedoMeterData } from '../assets/data/BooksData';
const { ScreenTimeModule } = NativeModules;

export default function AppAnalysis() {
    const [value, setValue] = useState(0);
    const [pieData, setPieData] = useState([]);
    
    useEffect(() => {
        ScreenTimeModule.getScreenTimeStats()
            .then((result) => {
                const cleanedString = result.replace(/^\{|\}$/g, '');
                const appUsageData = filterAppUsage.parseAppUsageData(cleanedString);
                const healthAffectingApps = filterAppUsage.getHealthAffectingApps(appUsageData);
                
                const totalUsage = Object.values(healthAffectingApps).reduce((acc, curr) => acc + curr, 0);
                setValue(totalUsage);

                // Extract app names and calculate percentages
                const pieDataArray = Object.keys(healthAffectingApps).map(key => {
                    const usage = healthAffectingApps[key];
                    const percentage = (usage / totalUsage) * 100;
                    const parts = key.split('.');
                    const appName = parts[parts.length - 1]; // Extract the app name
                    return {
                        value: percentage,
                        color: getRandomColor(),
                        appName: appName, // Use extracted app name
                    };
                });

                setPieData(pieDataArray);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    // Function to generate random colors
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const renderDot = color => {
        return (
            <View
                style={{
                    height: 10,
                    width: 10,
                    borderRadius: 5,
                    backgroundColor: color,
                    marginRight: 10,
                }}
            />
        );
    };

    const renderLegendComponent = () => {
        return pieData.map((item, index) => (
            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                {renderDot(item.color)}
                <Text style={{ color: 'white' }}>{item.appName}: {item.value.toFixed(2)}%</Text>
            </View>
        ));
    };

    return (
        <View style={{ backgroundColor: colorTheme.appBackGroundColor, flex: 1 }}>
            <View style={{ width: '90%', alignSelf: 'center', flex: 1 }}>
                <Header leftIconName header={'App Usage Analysis'} />
                <View style={{ marginVertical: 40, flex: 2 }}>
                    <RNSpeedometer value={value} size={200} minValue={0} maxValue={24} labels={speedoMeterData} />
                </View>
                <View style={{ padding: 16, borderRadius: 20, backgroundColor: '#232B5D' }}>
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Performance</Text>
                    <View style={{ padding: 20, alignItems: 'center' }}>
                        <PieChart
                            data={pieData}
                            donut
                            showGradient
                            sectionAutoFocus
                            radius={90}
                            innerRadius={60}
                            innerCircleColor={'#232B5D'}
                            centerLabelComponent={() => (
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 22, color: 'white', fontWeight: 'bold' }}>
                                        {value}
                                    </Text>
                                    <Text style={{ fontSize: 14, color: 'white' }}>Total Usage</Text>
                                </View>
                            )}
                        />
                    </View>
                    {renderLegendComponent()}
                </View>
            </View>
        </View>
    );
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
    },
    bigText: {
        fontSize: blackText.fontSize,
        color: blackText.color,
        fontWeight: blackText.fontWeight,
    },
    smallText: {
        fontSize: grayText.fontSize,
        color: grayText.color,
        fontWeight: grayText.fontWeight,
    },
    blueText: {
        fontSize: blueText.fontSize,
        color: blueText.color,
        fontWeight: blueText.fontWeight,
    },
    textInput: {
        borderRadius: 10,
        backgroundColor: "white",
        padding: 7,
        borderWidth: 1,
        borderColor: "#d3d2d6",
        height: 200,
        textAlignVertical: 'top',
    },
});
