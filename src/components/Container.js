import React from 'react';
import { StatusBar, SafeAreaView, StyleSheet } from "react-native";
import theme from "../constants"

const Container = (props) => {
    return (
        <>
            <StatusBar barStyle="default" />
            <SafeAreaView style={[styles.container, props.style]}>
                {props.children}
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        margin: theme.sizes.basePadding
    }
})

export default Container