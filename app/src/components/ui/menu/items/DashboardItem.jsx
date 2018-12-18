import React, {Component} from 'react';
import {NavItem} from 'reactstrap';
import {HashRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default class DashboardItem extends Component {
    constructor(props) {
        super(props);
    }

    /*******************************************************************************************************************
     ***** RENDER ******************************************************************************************************
     ******************************************************************************************************************/

    render() {
        return (
            <React.Fragment>
                <NavItem>
                    <Link className="nav-link" to="/dashboard">
                        <div className="float-left mr-2">
                            <FontAwesomeIcon icon={"home"}/>
                        </div>

                        Dashboard
                    </Link>
                </NavItem>
            </React.Fragment>
        )
    }
}


