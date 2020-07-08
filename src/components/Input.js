import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import theme from "../constants"
import Typo from './Typo';
import Block from './Block';


const Input = (props) => {
    const containerStyles = [styles.container]
    const textStyles = [styles.text]
    props.bordered ? containerStyles.push(styles.bordered) : null
    props.bordered ? textStyles.push(styles.textDark) : null
    props.style ? [containerStyles.push(props.style)] : null
    props.textStyle ? textStyles.push(props.textStyle) : null

    console.log(props.icon)
    const renderLabel = () => {
        if (props.label) {
            return (
                <Typo size="md" weight="s" style={{ fontSize: 15, fontFamily: "SFProText-Medium" }}>{props.label}</Typo>
            )
        }
    }

    if (props.icon && props.icon !== "undefined" ) {
        console.log(props.icon)
        return (
            <Block row style={[containerStyles, { padding: 0, justifyContent: "space-between" }]}>
                <TextInput style={{ padding: 15, width: "100%" }} {...props} />
                <TouchableOpacity onPress={props.onIconPress}>
                    <Icon name={props.icon} size={28} color={theme.colors.mid} style={{ paddingRight: 5 }} />
                </TouchableOpacity>
            </Block>
        )
    }


    return (
        <Block style={{paddingVertical: 10}}>
            {renderLabel()}
            <TextInput style={containerStyles} {...props} />
        </Block>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        padding: 13,
        marginVertical: 5,
        width: "100%",
        borderRadius: 5,
        color: theme.colors.dark,
        borderWidth: 1,
        borderColor: theme.colors.light,
        fontFamily: theme.font.light
    },
    bordered: {
        borderWidth: 1,
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.white
    },
    text: {
        color: theme.colors.white,
    },
    textDark: {
        color: theme.colors.primary,
    }
})

export default Input