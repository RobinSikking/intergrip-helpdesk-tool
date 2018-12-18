import React, {Component} from 'react';
import {inject} from 'mobx-react';
import {Redirect} from "react-router-dom";

@inject('AuthStore')
export default class Logout extends Component {
    constructor(props) {
        super(props);

        this.props.AuthStore.logout();
    }

    /*******************************************************************************************************************
     ***** RENDER ******************************************************************************************************
     ******************************************************************************************************************/

    render() {
        return <Redirect to="/" />
    }
}