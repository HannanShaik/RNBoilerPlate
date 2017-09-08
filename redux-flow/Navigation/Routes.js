import LoginScreen from '../Containers/LoginScreen'
import ContactsScreen from '../Containers/ContactsScreen'

export default {
    LoginScreen: {
        name: 'LoginScreen',
        description: 'Login Page',
        screen: LoginScreen,
        navigationOptions: {
            header: null
        }
    },
    ContactsScreen: {
        name: 'ContactsScreen',
        description: 'Contact Page',
        screen: ContactsScreen
    }
};