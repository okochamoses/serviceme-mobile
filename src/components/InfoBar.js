import React from "react"
import { View, StyleSheet, Dimensions } from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Block from './Block';
import Typo from "./Typo";
import theme from "../constants"
const { width, height } = Dimensions.get("window");

const InfoBar = (props) => {
    const containerStyles = [styles.infoBar]
    props.top ? containerStyles.push({marginTop: props.top}): null
    props.style ? containerStyles.push({...props.style}): null
    return (
        <Block center style={containerStyles} >
            {props.children}
        </Block>
    )
}

export default InfoBar;

const styles = StyleSheet.create({
    infoBar: {
        width: width * 0.9,
        backgroundColor: theme.colors.white,
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