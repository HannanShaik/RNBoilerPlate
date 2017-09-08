import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import LoginActions, { LoginTypes } from '../Redux/LoginRedux'

export function* validateUser(api, action) {
    const { email } = action
    const response = yield call(api.validateUser, email)
    console.log(response);

    if (response.ok) {
        const status = path(['data', 'status'], response)
        if (status.code === 0 && status.response_code === 200) {
            console.log(status);
            yield put(LoginActions.validateUserSuccess(email))
        } else {
            yield put(LoginActions.validateUserFailure(status.response_message))
        }
    } else {
        yield put(LoginActions.validateUserFailure('Server Error - ' + response.status))
    }
}

export function* getUserInfo(api, action) {
    try {
        const { accessToken } = action
        const response = yield call(api.getUserInfo, accessToken)
        if (response.ok) {
            const user = path(['data'], response)
            console.log(user.mail);
            yield put({ type: LoginTypes.VALIDATE_USER, email: user.mail })
        } else {
            yield put(LoginActions.getUserInfoFailure('Server Error - ' + response.status))
        }
    } catch (e) {
        console.log(e);
    }
}


/*
let access_token = ADContext.getAccessToken('https://graph.microsoft.com');
    fetch('https://graph.microsoft.com/beta/me', {
      method: 'GET',
      headers: {
        Authorization: `bearer ${access_token}`
      }
    })
      .then(res => res.json())
      .then(user => {
        console.log(user.displayName);
        console.log(user.mail);
        console.log(user.jobTitle);
        this.props.loginUser(user.mail);
      })
*/
