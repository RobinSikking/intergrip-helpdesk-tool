import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default class Loader extends Component {
    /*******************************************************************************************************************
     ***** RENDER ******************************************************************************************************
     ******************************************************************************************************************/

    render() {
        return (
            <div className="text-center">
                <FontAwesomeIcon icon="sun" spin={true} size="3x"/>
            </div>
        );
    }
}