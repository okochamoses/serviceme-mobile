import React from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Block from './Block';
import Typo from "./Typo";
import theme from "../constants"

const ListItem = ({ title, subtitle, onPress, titleSize }) => (
    <TouchableOpacity style={{width: "100%"}} onPress={onPress}>
        <Block row style={{ borderBottomWidth: StyleSheet.hairlineWidth, borderColor: theme.colors.mid, justifyContent: "space-between", alignItems: "center", paddingHorizontal: 10 }}>
            <View style={{ paddingVertical: 15 }}>
                <Typo weight="l">{title}</Typo>
                {subtitle ? <Typo size="sm" weight="l" color="mid">{subtitle}</Typo> : null}
            </View>
            <View>
                <Icon name="chevron-right" size={24} color={theme.colors.mid}/>
            </View>
        </Block>
    </TouchableOpacity>
)

export default ListItem;