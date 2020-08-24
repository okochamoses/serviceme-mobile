import React, { useState, useEffect } from 'react';
import { StatusBar, SafeAreaView, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import Block from '../../components/Block';
import theme from "../../constants"
import Container from '../../components/Container';
import Modal from 'react-native-modal';
import InfoBar from '../../components/InfoBar';
import Typo from '../../components/Typo';
import InfoCard from '../../components/InfoCard';
import Input from '../../components/Input';
import Line from '../../components/Line';
const { width, height } = Dimensions.get("window");


const BusinessProfile = ({ navigation, route }) => {
    console.log(route)
    const { businessId, profile } = route.params;
    console.log(profile)
    const [business, setBusiness] = useState([]);
    const _getBusiness = async () => {

        await setBusiness(profile.businesses.find(business => business._id == businessId))
    }
    useEffect(() => {
        async function loadProfile() {
            await _getBusiness()
        }
        loadProfile()
    }, [business])

    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ backgroundColor: theme.colors.primary }}></SafeAreaView>
            <Container scroll full >


                {/* Modal */}
                <Modal
                    animationType="slide"
                    isVisible={false}
                    onBackdropPress={() => console.log("BACKDROP PRESS")}
                    hasBackdrop={true}
                >
                    <Block style={styles.modal}>
                        <Typo weight="s">Change Description</Typo>
                        <Line />
                        <Input autoCapitalize="sentences" multiline={true} />
                    </Block>
                </Modal>
                

                <Block row style={{ height: height / 6, backgroundColor: theme.colors.primary, }}></Block>
                <InfoBar top={-height / 8} style={{ marginBottom: 10 }}>
                    {
                        business.images === undefined || business.images.length === 0 ? 
                        <Image source={{uri: "https://i.pinimg.com/originals/e9/80/f7/e980f7be96698681e64bac92221cfb7d.png"}} style={styles.image} />
                         :
                        <Image source={{ uri: business.images[0] }} style={styles.image} />
                    }
                    <Typo size="lg" style={{ paddingBottom: 5 }}>{business.businessName}</Typo>
                    <Typo size="sm" weight="l" color="dark">{`${profile.firstName} ${profile.lastName}`}</Typo>
                    <Typo size="sm" weight="l" color="dark">{business.email}</Typo>
                    <Typo size="sm" weight="l" color="dark">{business.phone}</Typo>
                </InfoBar>
                <InfoCard title={"Subscriptions"} link="Pay" body={"Subscription is Active, your next renewal date is 21/07/2020"} onPressLink={() => { }} />
                <InfoCard title={"Address Details"} link="" body={`${business.streetAddress}, ${business.lga}, ${business.state}. \nLandmark: ${business.landmark}`} onPressLink={() => { }} />
                <InfoCard title={"Description"} link="Change" body={business.description} onPressLink={() => { }} />
                <InfoCard title={"Images"} link=""onPressLink={() => { }}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <Block style={[styles.imageScroll, {justifyContent: "center", alignItems: "center"}]}>
                            <Icon name="plus" size={50} color={theme.colors.mid} />
                            <Typo size="sm" weight="l" color="mid">Add Image</Typo>
                        </Block>
                        {
                            (business.images ? business.images : []).map((image, idx) => <Image key={idx} source={{ uri: image }} style={styles.imageScroll} />)
                        }
                    </ScrollView>
                </InfoCard>

            </Container>
        </>
    )
}

export default BusinessProfile;


const styles = StyleSheet.create({
    image: { height: 80, width: 80, borderRadius: 40, margin: 20, borderWidth: 2, borderColor: theme.colors.mid },
    modal: {backgroundColor: theme.colors.white, height: "50%", borderRadius: 10, padding: 20},
    imageScroll: { height: width/4, width: width/4, borderRadius: 5, margin: 20, borderWidth: 2, borderColor: theme.colors.light },
})