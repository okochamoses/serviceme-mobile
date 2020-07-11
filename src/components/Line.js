import React from "react"
import { View, StyleSheet, Dimensions } from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Block from './Block';
import Typo from "./Typo";
import theme from "../constants"
const { width, height } = Dimensions.get("window");

const Line = () => (
    <View style={styles.line}></View>
)

export default Line;

const styles = StyleSheet.create({
    line: {
        borderBottomColor: "#EFEFEF",
        borderBottomWidth:1,
        width: "100%",
        marginVertical: 10
    },
})