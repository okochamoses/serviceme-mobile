import React from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../constants';
import Typo from './Typo';
import Block from './Block';

const Input = props => {
  const containerStyles = [styles.container];
  const textStyles = [styles.text];
  props.bordered ? containerStyles.push(styles.bordered) : null;
  props.bordered ? textStyles.push(styles.textDark) : null;
  props.style ? [containerStyles.push(props.style)] : null;
  props.textStyle ? textStyles.push(props.textStyle) : null;
  props.containerStyle ? containerStyles.push(props.containerStyle) : null;

  const renderLabel = () => {
    if (props.label) {
      return (
        <Block>
          <Typo
            size="md"
            weight="s"
            style={{
              fontSize: 15,
              fontFamily: 'SFProText-Medium',
              justifyContent: 'flex-start',
            }}>
            {props.label}
          </Typo>
        </Block>
      );
    }
  };

  if (props.icon && props.icon !== 'undefined') {
    return (
      <>
        {renderLabel()}
        <Block
          row
          style={[
            containerStyles,
            {padding: 0, justifyContent: 'space-between', ...props.style},
          ]}>
          <TextInput autoCorrect={false} style={[{padding: 15},]} {...props} />
          <TouchableOpacity onPress={props.onIconPress}>
            <Icon
              name={props.icon}
              size={28}
              color={theme.colors.mid}
              style={{paddingRight: 5}}
            />
          </TouchableOpacity>
        </Block>
      </>
    );
  }

  return (
    <Block style={{paddingVertical: 10, ...props.style}}>
      {renderLabel()}
      <TextInput autoCorrect={false} style={[containerStyles, ...textStyles]} {...props} />
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 13,
    marginVertical: 5,
    // width: "100%",
    borderRadius: 5,
    color: theme.colors.dark,
    borderWidth: 1,
    borderColor: theme.colors.light,
    fontFamily: theme.font.light,
    backgroundColor: theme.colors.white,
    // textAlignVertical: 'top'
  },
  bordered: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.white,
  },
  text: {
    color: theme.colors.dark,
  },
  textDark: {
    color: theme.colors.primary,
  },
});

export default Input;
