import React, {Component} from 'react';
import {
  Switch,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import theme from '../constants';
import Container from '../components/Container';
import Button from '../components/Button';
import Typo from '../components/Typo';
import Block from '../components/Block';
import Input from '../components/Input';
import {
  register as registerProvider,
  register,
} from '../services/authentication';
import Modal from '../components/Modal';

export default class RegisterProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newsletter: false,
      loading: false,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phone: '',
      registerAsProvider: false,
      show: false,
      apiErrorMessage: '',
    };
  }

  toggleLoading = () => {
    this.setState({loading: !this.state.loading});
  };

  toggleShow = () => {
    this.setState({show: !this.state.show});
  };

  register = async () => {
    this.toggleLoading();
    const {
      firstName,
      lastName,
      phone,
      password,
      registerAsProvider,
      newsletter,
    } = this.state;
    const email = this.state.email.toLowerCase().trim();

    const response = await registerProvider(
      firstName,
      lastName,
      email,
      phone,
      password,
      registerAsProvider,
      newsletter,
    );
    if (response.status === 0) {
      this.toggleLoading();
      if (registerAsProvider) {
        this.props.navigation.navigate('Complete Registration 1', {
          providerId: response.data._id,
        });
      } else {
        this.props.navigation.navigate('Registration Complete');
      }
      // Navigate to new page
    } else {
      this.toggleLoading();
      this.setState({show: true});
      this.setState({apiErrorMessage: response.description});
      // show error modal
    }
  };

  render() {
    const navigation = this.props.navigation;
    return (
      <ScrollView>
        <Container>
          <Modal
            message={this.state.apiErrorMessage}
            open={this.state.show}
            type="error"
            close={() => this.toggleShow()}
          />
          <Block>
            <Input
              editable={!this.state.loading}
              onChangeText={text => this.setState({firstName: text})}
              label="First Name"
            />
            <Input
              editable={!this.state.loading}
              onChangeText={text => this.setState({lastName: text})}
              label="Last Name"
            />
            <Input
              keyboardType="email-address"
              editable={!this.state.loading}
              onChangeText={text => this.setState({email: text})}
              label="Email"
            />
            <Input
              secureTextEntry={true}
              editable={!this.state.loading}
              onChangeText={text => this.setState({password: text})}
              label="Password"
            />
            <Input
              editable={!this.state.loading}
              onChangeText={text => this.setState({phone: text})}
              label="Phone Number"
            />
            <Block
              row
              vCenter
              center
              style={{marginBottom: 20, justifyContent: 'space-between'}}>
              <Block style={{flex: 1}}>
                <Switch
                  disabled={this.state.loading}
                  style={{transform: [{scaleX: 0.8}, {scaleY: 0.8}]}}
                  trackColor={{
                    false: theme.colors.primary,
                    true: theme.colors.success,
                  }}
                  ios_backgroundColor={theme.colors.primary}
                  onValueChange={() =>
                    this.setState({newsletter: !this.state.newsletter})
                  }
                  value={this.state.newsletter}
                />
              </Block>
              <Block style={{flex: 5}}>
                <Typo color="dark" size="sm">
                  I would like to receive the latest news from serviceme by
                  email
                </Typo>
              </Block>
            </Block>
            <Block
              row
              vCenter
              center
              style={{marginBottom: 20, justifyContent: 'space-between'}}>
              <Block style={{flex: 1}}>
                <Switch
                  disabled={this.state.loading}
                  style={{transform: [{scaleX: 0.8}, {scaleY: 0.8}]}}
                  trackColor={{
                    false: theme.colors.primary,
                    true: theme.colors.success,
                  }}
                  ios_backgroundColor={theme.colors.primary}
                  onValueChange={() =>
                    this.setState({
                      registerAsProvider: !this.state.registerAsProvider,
                    })
                  }
                  value={this.state.registerAsProvider}
                />
              </Block>
              <Block style={{flex: 5}}>
                <Typo color="dark" size="sm">
                  Register as a provider
                </Typo>
              </Block>
            </Block>
            <Button onPress={() => this.register()}>
              {this.state.loading ? (
                <ActivityIndicator color="white" />
              ) : (
                'Register'
              )}
            </Button>
          </Block>
        </Container>
      </ScrollView>
    );
  }
}
