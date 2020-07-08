import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from "react-native";
import theme from "../../constants"
import Typo from '../../components/Typo';
import Block from '../../components/Block';
const { width, height } = Dimensions.get("window");
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Container from '../../components/Container';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProviderDashboard = ({ navigation }) => {
    const [profile, setProfile] = useState({})

    useEffect(() => {
        async function loadProfile() {
            await _loadProfile()
        }
        loadProfile()
    }, [])

    const _loadProfile = async () => {
        const profile = JSON.parse(await AsyncStorage.getItem("profile"))
        await setProfile(profile)
    }

    return (
        <>
        <SafeAreaView style={{backgroundColor: theme.colors.primary}}></SafeAreaView>
            <Block center>
                <Block style={{ width: "100%", height: 0.2 * height, backgroundColor: theme.colors.primary, padding: 10 }}>
                    <Typo size="xl" weight="l" color="white">Good morning</Typo>
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
                        <Typo size="lg" weight="s">My Businesses</Typo>
                        <Block style={{}}>
                            {profile.businesses === undefined ?
                                null :
                                profile.businesses.map(business => (
                                    <Block row style={{ borderBottomWidth: StyleSheet.hairlineWidth, borderColor: theme.colors.mid, justifyContent: "space-between", alignItems: "center" }}>
                                        <View style={{ paddingVertical: 15 }}>
                                            <Typo weight="l">{business.businessName}</Typo>
                                            <Typo size="sm" weight="l" color="mid">Category: {business.category.name}</Typo>
                                        </View>
                                        <View>
                                            <Icon name="chevron-right" size={24} />
                                        </View>
                                    </Block>
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