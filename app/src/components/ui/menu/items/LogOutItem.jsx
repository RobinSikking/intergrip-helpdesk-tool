import React, {Component} from 'react';
import {NavItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default class LogOutItem extends Component {
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
                    <Link className="nav-link" to="/logout">
                        <div className="float-left mr-2">
                            <FontAwesomeIcon icon={"sign-out-alt"}/>
                        </div>

                        Uitloggen
                    </Link>
                </NavItem>
            </React.Fragment>
        )
    }
}


