import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar } from "react-native";
import theme from "../../constants"
import Typo from '../../components/Typo';
import Block from '../../components/Block';
const { width, height } = Dimensions.get("window");
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Container from '../../components/Container';
import { SafeAreaView } from 'react-native-safe-area-context';
import ListItem from '../../components/ListItem';

const ProviderDashboard = ({ navigation, route }) => {
    const [profile, setProfile] = useState({})

    useEffect(() => {
        async function loadProfile() {
            await _loadProfile()
        }
        console.log(route)
        loadProfile()
    }, [])

    const _loadProfile = async () => {
        const profile = JSON.parse(await AsyncStorage.getItem("profile"))
        await setProfile(profile)
    }

    const getGreeting = () => {
        const currentTime = new Date().getHours();
        console.log(currentTime)
        if(currentTime >= 0 && currentTime < 4) {
            return "Still awake? "
        }else if(currentTime >= 4 && currentTime < 12) {
            return "Good morning "
        } else if(currentTime >= 12 && currentTime < 17) {
            return "Good afternoon "
        } else if(currentTime >= 17 && currentTime < 12) {
            return "Good Evening "
        }
    }

    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ backgroundColor: theme.colors.primary }}></SafeAreaView>
            <Block center>
                <Block style={{ width: "100%", height: 0.2 * height, backgroundColor: theme.colors.primary, paddingHorizontal: 20, paddingTop: 10 }}>
    <Typo size="xl" weight="l" color="white">{getGreeting()}</Typo>
                    <Typo size="xl" color="white">{profile.firstName}</Typo>
                </Block>
                <Block center style={{ paddingHorizontal: 10 }}>
                    <Block center style={styles.infoBar}>
                        <Typo size="md" color="dark">Page Impressions</Typo>

                        <Block center row>
                            <Block center style={{ width: "50%" }}>
                                <Typo size="sm" color="mid" weight="l" style={styles.infoBarText}>Today</Typo>
                                <Typo size="xl" color="success" weight="s" style={styles.infoBarText}>4,302</Typo>
                            </Block>

                            <Block center style={{ width: "50%" }}>
                                <Typo size="sm" color="mid" weight="l" style={styles.infoBarText}>Last 7 days</Typo>
                                <Typo size="xl" color="primary" weight="s" style={styles.infoBarText}>31,792</Typo>
                            </Block>
                        </Block>
                    </Block>

                    <Block style={{ paddingVertical: 20 }}>
                        <Typo weight="s" style={{ paddingBottom: 10, paddingHorizontal: 10 }}>My Businesses</Typo>
                        <Block style={{ borderBottomWidth: StyleSheet.hairlineWidth, borderColor: theme.colors.mid }} />
                        <Block>
                            {profile.businesses === undefined ?
                                null :
                                profile.businesses.map(business => (
                                    <ListItem key={business._id} title={business.businessName} subtitle={"Category: " + business.category.name} />
                                ))}
                        </Block>
                    </Block>
                </Block>
            </Block>
        </>
    )
}

export default ProviderDashboard;

const styles = StyleSheet.create({
    infoBar: {
        width: width * 0.9,
        backgroundColor: theme.colors.white,
        marginTop: "-10%",
        borderRadius: 10,
        padding: 10,
        paddingBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    },
    infoBarText: {
        paddingTop: 5
    }
})