import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import theme from "../constants"
import Container from '../components/Container';
import Button from '../components/Button';
import Typo from '../components/Typo';
import Block from '../components/Block';

export default class Auth extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Container style={{ flex: 1, justifyContent: "space-between", }}>
                <Block center vCenter style={{paddingTop: "30%"}}>
                    <Image source={require("../assets/images/logo.png")} />
                    <Block row vCenter style={{paddingTop: 40}}>
                        <Typo size="xl">Welcome to</Typo>
                        <Typo size="xl" color="primary"> Service Me</Typo>
                    </Block>
                    <Typo size="md" weight="l">Sign in or create an account</Typo>
                </Block>
                <Block center>
                </Block>
                <Block style={{paddingBottom: 40}}>
                    <Button>Login</Button>
                    <Button bordered>Sign Up</Button>
                </Block>
            </Container>
        )
    }
}