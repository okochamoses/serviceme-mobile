import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import theme from '../constants';
import Typo from './Typo';

const Button = props => {
  const containerStyles = [styles.container];
  const textStyles = [styles.text];
  props.bordered ? containerStyles.push(styles.bordered) : null;
  props.bordered ? textStyles.push(styles.textDark) : null;
  props.style ? [containerStyles.push(props.style)] : null;
  props.textStyle ? textStyles.push(props.textStyle) : null;
  return (
    <TouchableOpacity {...props} style={[containerStyles, props.style]}>
      {typeof props.children === 'string' ? (
        <Typo size="md" style={textStyles}>
          {props.children}
        </Typo>
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 13,
    marginVertical: 5,
    width: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    color: '#fff',
    // flex: 1
  },
  bordered: {
    padding: 13,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.white,
  },
  text: {
    color: theme.colors.white,
  },
  textDark: {
    color: theme.colors.primary,
  },
});

export default Button;
