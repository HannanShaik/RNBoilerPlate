import { Component } from 'react';
import _ from 'lodash';
import { NavigationActions } from 'react-navigation';
import Routes from '../Navigation/Routes';

class BaseScreen extends Component {
    constructor(props) {
        super(props);
        this.Screens = Routes;
        this.navigationParams = props.navigation.state.params;
    }

    navigate(route, params) {

        params = _.assign(params, route.params);
        params.navigate = this.navigate;
        this.props.navigation.navigate(route.name, params);
    }

    goBack() {
        this.props.navigation.goBack();
    }
}

export default BaseScreen;
