import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Switch, ScrollView } from "react-native";
import theme from "../constants"
import Container from '../components/Container';
import Button from '../components/Button';
import Typo from '../components/Typo';
import Block from '../components/Block';
import Input from '../components/Input';

export default class RegisterProvider extends React.Component {
    constructor(props) {
        super(props)
        this.state = { newsletter: false }
    }

    render() {
        const navigation = this.props.navigation;
        return (
            <ScrollView>
                <Container>
                    <Block>
                        <Input label="First Name" />
                        <Input label="Last Name" />
                        <Input label="Email" />
                        <Input label="Password" />
                        <Input label="Phone Number" />
                        <Block row vCenter center style={{ marginBottom: 20, justifyContent: "space-between" }}>
                            <Block style={{ flex: 1 }}>
                                <Switch
                                    style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
                                    trackColor={{ false: theme.colors.primary, true: theme.colors.success }}
                                    ios_backgroundColor={theme.colors.primary}
                                    onValueChange={() => this.setState({ newsletter: !this.state.newsletter })}
                                    value={this.state.newsletter}
                                />
                            </Block>
                            <Block style={{ flex: 5, }}>
                                <Typo color="dark" size="sm">I would like to receive the latest news from serviceme by email</Typo>
                            </Block>
                        </Block>
                        <Block row vCenter center style={{ marginBottom: 20, justifyContent: "space-between" }}>
                            <Block style={{ flex: 1 }}>
                                <Switch
                                    style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
                                    trackColor={{ false: theme.colors.primary, true: theme.colors.success }}
                                    ios_backgroundColor={theme.colors.primary}
                                    onValueChange={() => this.setState({ newsletter: !this.state.newsletter })}
                                    value={this.state.newsletter}
                                />
                            </Block>
                            <Block style={{ flex: 5, }}>
                                <Typo color="dark" size="sm">Register as a provider</Typo>
                            </Block>
                        </Block>
                        <Button onPress={() => navigation.navigate("Login")}>Register</Button>
                    </Block>
                </Container>
            </ScrollView>
        )
    }
}