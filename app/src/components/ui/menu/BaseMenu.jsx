import React, {Component} from 'react';
import {library} from '@fortawesome/fontawesome-svg-core';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import Auth from './../../../components/Auth.jsx';
import SupervisorMenu from './SupervisorMenu.jsx';
import moment from "moment";

export default class BaseMenu extends Component {
    constructor(props) {
        super(props);

        this.loadDotEnv()
            .loadFontAwesomeLibrary()
            .setLocale('nl');
    }

    /*******************************************************************************************************************
     ***** METHODS *****************************************************************************************************
     ******************************************************************************************************************/

    loadFontAwesomeLibrary() {
        library.add(
            Icons.faHome, Icons.faAt, Icons.faLock, Icons.faDotCircle, Icons.faSun, Icons.faSearch, Icons.faEnvelope,
            Icons.faSignInAlt, Icons.faSignOutAlt
        );

        return this;
    }

    loadDotEnv() {
        require('dotenv').config();

        process.env.API_ROOT_URL = process.env.API_URL_PREFIX + '://' + process.env.API_DOMAIN;

        return this;
    }

    setLocale(locale) {
        moment.locale(locale);

        return this;
    }

    /*******************************************************************************************************************
     ***** RENDER ******************************************************************************************************
     ******************************************************************************************************************/

    render() {
        return (
            <Auth role={"supervisor"}>
                <SupervisorMenu/>
            </Auth>
        )
    }
}