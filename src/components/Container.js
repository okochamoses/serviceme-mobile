import React from 'react';
import { StatusBar, SafeAreaView, StyleSheet, ScrollView, Dimensions } from "react-native";
import theme from "../constants"

const Container = (props) => {
    const containerStyles = [styles.container]
    props.full ? containerStyles.push({ margin: 0 }) : null;
    return (
        <>
            <StatusBar barStyle="default" />
            <ScrollView>
                <SafeAreaView style={[...containerStyles, props.style]}>
                    {props.children}
                </SafeAreaView>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        margin: theme.sizes.basePadding,
    }
})

export default Container