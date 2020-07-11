import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import theme from "../constants"

const Typo = (props) => {
    const textStyles = [styles.text]
    props.size ? textStyles.push({ fontSize: theme.sizes[props.size] }) : null
    props.alt ? textStyles.push({ fontFamily: 'SFProText-Light' }) : null
    props.color ? textStyles.push({ color: theme.colors[props.color] }) : null
    switch (props.weight) {
        case "l":
            textStyles.push({ fontFamily: theme.font.light })
            break;
        case "r":
            textStyles.push({ fontFamily: theme.font.regular })
            break;
        case "s":
            textStyles.push({ fontFamily: theme.font.semibold })
            break;

        default:
            break;
    }
    props.style ? textStyles.push(props.style) : null
    return (
        <Text style={textStyles}>{props.children}</Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: theme.sizes.md,
        fontFamily: theme.font.regular,
        color: theme.colors.dark,
    },
    alternateText: {
        fontFamily: 'SFProText-Light'
    }
})

export default Typo