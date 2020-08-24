import React, { useState, useEffect } from 'react';
import { StatusBar, SafeAreaView, ScrollView } from 'react-native';
import Block from '../../components/Block';
import theme from "../../constants"
import Container from '../../components/Container';
import ListItem from '../../components/ListItem';
import AsyncStorage from '@react-native-community/async-storage';


const Analytics = ({navigation, route}) => {
    const [businesses, setBusinesses] = useState([]);
    const [profile, setProfile] = useState({});
    const _getBusinesses = async () => {
        const profile = JSON.parse(await AsyncStorage.getItem("profile"))
        await setBusinesses(profile.businesses)
        setProfile(profile)
    }
    useEffect(() => {
        async function loadProfile() {
            await _getBusinesses()
        }
        loadProfile()
    }, [])

    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ backgroundColor: theme.colors.primary }}></SafeAreaView>
            <ScrollView>
                <Container style={{paddingTop: -20}}>
                    {
                        businesses.map((business) => <ListItem onPress={() => navigation.navigate("Profile", {businessId: business._id, profile})} key={business._id} title={business.businessName} subtitle={"Category: " + business.category.name} />)
                    }
                </Container>
            </ScrollView>
        </>
    )
}

export default Analytics;