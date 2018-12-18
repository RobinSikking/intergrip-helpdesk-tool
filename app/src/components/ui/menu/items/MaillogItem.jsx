import React, {Component} from 'react';
import {NavItem} from 'reactstrap';
import {HashRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default class MaillogItem extends Component {
    constructor(props) {
        super(props);
    }

    /*******************************************************************************************************************
     ***** RENDER ******************************************************************************************************
     ******************************************************************************************************************/

    render() {
        return (
            <React.Fragment>
                <NavItem className="border-bottom border-secondary">
                    <Link className="nav-link" to="/maillog">
                        <div className="float-left mr-2">
                            <FontAwesomeIcon icon={"at"}/>
                        </div>

                        Maillog
                    </Link>
                </NavItem>
            </React.Fragment>
        )
    }
}


