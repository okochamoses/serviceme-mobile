import React from 'react';
import { StatusBar, SafeAreaView, StyleSheet, View } from "react-native";
import theme from "../constants"

const Block = (props) => {
    const containerStyles = [styles.container];
    props.row ? containerStyles.push({flexDirection: "row"}) : null
    props.center ? containerStyles.push({alignItems: "center"}) : null
    props.vCenter ? containerStyles.push({justifyContent: "center"}) : null
    return (
        <View style={[...containerStyles, props.style]}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
    }
})

export default Block