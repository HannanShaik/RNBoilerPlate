import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { ReactNativeAD, ADLoginView } from 'react-native-azure-ad'
import BaseScreen from './BaseScreen';
import LoginActions from '../Redux/LoginRedux';

const CLIENT_ID = 'XXXXX';
const AUTH_URL = 'https://login.microsoftonline.com/common/oauth2/authorize'
const ADContext = new ReactNativeAD({
  client_id: CLIENT_ID,
  authority_host: AUTH_URL,
  resources: [
    'https://graph.microsoft.com',
  ]
});

import styles from './Styles/LoginScreenStyle'

class LoginScreen extends BaseScreen {

  componentWillReceiveProps(nextProps) {
    if (nextProps.email) {
      this.navigate(this.Screens.ContactsScreen);
    }
  }
  render() {
    return (
      <ADLoginView
        hideAfterLogin={true}
        context={ADContext}
        onSuccess={this.onLoginSuccess.bind(this)}
      />
    );
  }


  onLoginSuccess(credentials) {
    let access_token = ADContext.getAccessToken('https://graph.microsoft.com');
    this.props.getUserInfo(access_token);
  }
}

const mapStateToProps = (state) => {
  const { fetching, error, email } = state.login;
  return {
    fetching, error, email
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfo: (authToken) => dispatch(LoginActions.getUserInfo(authToken))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
