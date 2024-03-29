import React, { useState, useEffect } from 'react';
import { StatusBar, SafeAreaView, ScrollView } from 'react-native';
import Block from '../../components/Block';
import theme from "../../constants"
import Container from '../../components/Container';
import ListItem from '../../components/ListItem';
import AsyncStorage from '@react-native-community/async-storage';


const Businesses = ({navigation, route}) => {
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
        console.log(route)
        loadProfile()
    }, [])

    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ backgroundColor: theme.colors.primary }}></SafeAreaView>
            <ScrollView>
                <Container style={{paddingTop: -20}}>
                    {
                        businesses.map((business) => {
                        return <ListItem onPress={() => navigation.navigate("Profile", {businessId: "5ed95f97cacf8e6929f7cf9a", profile})} 
                        key={business._id} title={business.businessName} subtitle={"Category: " + business._id} />})
                    }
                </Container>
            </ScrollView>
        </>
    )
}

export default Businesses;