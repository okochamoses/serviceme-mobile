import React, {Component} from 'react';

export const AuthContext = React.createContext({isAuthenticated: false, isLoading: false});

class AuthContextProvider extends Component {
  state = {
    isAuthenticated: false,
    isLoading: true,
  };

  toggleIsAuthenticated = () => {
    this.setState({isAuthenticated: !this.state.isAuthenticated});
  };

  toggleIsLoading = () => {
    this.setState({isLoading: !this.state.isLoading});
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          toggleIsAuthenticated: this.toggleIsAuthenticated,
          toggleIsLoading: this.toggleIsLoading,
        }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthContextProvider;
