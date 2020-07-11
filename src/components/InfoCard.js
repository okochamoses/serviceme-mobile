import React from "react"
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Block from './Block';
import Typo from "./Typo";
import theme from "../constants"
import Line from "./Line";
const { width, height } = Dimensions.get("window");

const InfoCard = ({ title, link, body }) => (
    <Block center style={styles.infoCard}>
        <Block row center spaceBetween>
            <Typo weight="s">{title}</Typo>
            <TouchableOpacity>
                <Typo size="sm" color="primary">{link}</Typo>
            </TouchableOpacity>
        </Block>
        <Line />
        <Typo weight="l" style={{width: "100%"}}>
            {body}
        </Typo>
    </Block>
)

export default InfoCard;

const styles = StyleSheet.create({
    infoCard: {
        width: "100%",
        borderRadius: 10,
        padding: 10,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    infoCardText: {
        paddingTop: 5
    }
})