import React, {Component} from 'react';
import {Container, Row} from 'reactstrap';
import {library} from '@fortawesome/fontawesome-svg-core';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import BaseMenu from 'intergrip-ui/menu/BaseMenu.jsx';
import BaseContent from 'intergrip-ui/content/BaseContent.jsx';
import {HashRouter as Router} from 'react-router-dom';
import Auth from 'intergrip-components/Auth.jsx';
import moment from 'moment';
import {ipcRenderer} from 'electron';

import './assets/sass/helpdesk.scss';

export default class HelpDesk extends Component {
    constructor(props) {
        super(props);

        this.loadDotEnv()
            .loadFontAwesomeLibrary()
            .setLocale('nl')
            .loadIpcRenderer();
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

    loadIpcRenderer() {
        ipcRenderer.on('message', (event, text) => {
            console.log('Message from updater: ' + text, event);
        });

        return this;
    }

    /*******************************************************************************************************************
     ***** RENDER ******************************************************************************************************
     ******************************************************************************************************************/

    render() {
        return (
            <Auth role={Auth.ROLE_ID_SUPERVISOR}>
                <Router>
                    <Container fluid={true} className="h-100">
                        <Row className="h-100">
                            <BaseMenu/>
                            <BaseContent/>
                        </Row>
                    </Container>
                </Router>
            </Auth>
        )
    }
}