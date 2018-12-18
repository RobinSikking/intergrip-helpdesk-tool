import React, {Component} from 'react';
import Auth from './../../../components/Auth.jsx';
import Dashboard from 'intergrip-content/Dashboard.jsx';
import MailLog from 'intergrip-content/MailLog.jsx';
import Logout from 'intergrip-content/Logout.jsx';
import {Route} from 'react-router-dom';
import {Col} from 'reactstrap';
import Logo from 'intergrip-components/../assets/images/intergrip-logo.svg';

export default class BaseContent extends Component {
    constructor(props) {
        super(props);
    }

    /*******************************************************************************************************************
     ***** METHODS *****************************************************************************************************
     ******************************************************************************************************************/


    /*******************************************************************************************************************
     ***** RENDER ******************************************************************************************************
     ******************************************************************************************************************/

    render() {
        return (
            <Auth role={"supervisor"}>
                <Col className="content-wrapper p-0">
                    <div className="p-3">
                        <Route exact path="/dashboard" render={() => <Dashboard/>}/>
                        <Route exact path="/maillog" render={() => <MailLog/>}/>
                        <Route exact path="/logout" render={() => <Logout/>}/>
                    </div>
                    <img src={Logo} className="logo-bg"/>
                </Col>
            </Auth>
        )
    }
}