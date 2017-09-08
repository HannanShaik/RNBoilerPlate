import { StackNavigator } from 'react-navigation'
import routes from './Routes';
import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator(
  routes,
  {
    // Default config for all screens
    initialRouteName: 'LoginScreen',
    navigationOptions: {
      headerStyle: styles.header
    }
  })

export default PrimaryNav
