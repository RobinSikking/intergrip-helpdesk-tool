import React, {Component} from 'react';
import {Nav, NavItem, Col} from 'reactstrap';
import {DashboardItem, LogOutItem, MaillogItem} from 'intergrip-menu';
import Logo from './../../../assets/images/intergrip-logo.svg';
import {Link} from 'react-router-dom';

export default class SupervisorMenu extends Component {
    constructor(props) {
        super(props);
    }

    /*******************************************************************************************************************
     ***** RENDER ******************************************************************************************************
     ******************************************************************************************************************/

    render() {
        return (
            <Col className="sidebar p-0">
                <Nav vertical className="navigation mt-2">
                    <DashboardItem/>
                    <MaillogItem/>
                    <LogOutItem/>
                </Nav>
            </Col>
        )
    }
}


