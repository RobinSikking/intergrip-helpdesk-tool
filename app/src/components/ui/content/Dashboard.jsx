import React, {Component} from 'react';
import {InputGroup, Input, Row, Col} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {inject} from "mobx-react";
import Loader from "intergrip-components/Loader.jsx";
import {debounce} from 'intergrip-components/../helpers/Debounce.jsx';

@inject('DataStore')
export default class Dashboard extends Component {
    static MAX_USERS = 50;
    static MAX_ACTIONS = 10;

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            users: [],
            filteredUsers: [],
            actions: [],
            filteredActions: [],
        };

        this.props.DataStore
            .SearchService
            .index()
            .then(this.setData.bind(this));

        this.handleSearchChanged = this.handleSearchChanged.bind(this);

        this.search = debounce(this.search, 150);
    }

    /*******************************************************************************************************************
     ***** METHODS *****************************************************************************************************
     ******************************************************************************************************************/

    setData(response) {
        this.setState({
            loading: false,
            users: response.data.data.users,
            actions: response.data.data.actions,
        });

        // setTimeout(this.search('ma'), 250); //TMP DEBUG METHOD
    }

    search(value) {
        if (value.length < 2) {
            return;
        }

        let filteredUsers = this.state.users.filter((user) => {
            return user.name.indexOf(value) !== -1;
        });

        let filteredActions = this.state.actions.filter((action) => {
            return action.name.indexOf(value) !== -1;
        });

        this.setState({
            filteredUsers: filteredUsers.slice(0, Dashboard.MAX_USERS),
            filteredActions: filteredActions.slice(0, Dashboard.MAX_ACTIONS),
        });
    }

    /*******************************************************************************************************************
     ***** HANDLERS ****************************************************************************************************
     ******************************************************************************************************************/

    handleSearchChanged(event) {
        let value = event.target.value;

        event.preventDefault();

        this.search(value)
    }

    /*******************************************************************************************************************
     ***** RENDER ******************************************************************************************************
     ******************************************************************************************************************/

    renderSearchUsers() {
        if (this.state.filteredUsers.length < 1) {
            return null;
        }

        return (
            <Row>
                <Col>
                    <fieldset>
                        <legend>Gebruikers</legend>

                        <ul className="list-group list-">
                            {
                                this.state.filteredUsers.map((user) => {
                                    return <li key={user.id} className="list-group-item list-group-item-action">{user.name}</li>
                                })
                            }
                        </ul>
                    </fieldset>
                </Col>
            </Row>
        )
    }

    renderSearchActions() {
        if (this.state.filteredActions.length < 1) {
            return null;
        }

        return (
            <Row>
                <Col>
                    <fieldset>
                        <legend>Acties</legend>

                        <ul className="list-group">
                            {
                                this.state.filteredActions.map((action) => {
                                    return <li key={action} className="list-group-item list-group-item-action">{action}</li>
                                })
                            }
                        </ul>
                    </fieldset>
                </Col>
            </Row>
        )
    }

    render() {
        if (this.state.loading) {
            return <Loader/>
        }

        return (
            <div className="content search">
                <Row>
                    <Col>
                        <InputGroup>
                            <div className="input-group addon">
                                <Input placeholder="Wat wil je doen, of zoek je wat?"
                                       onChange={this.handleSearchChanged}/>

                                <div className="input-group-append">
                                    <span className="input-group-text">
                                        <FontAwesomeIcon icon="search"/>
                                    </span>
                                </div>
                            </div>
                        </InputGroup>
                    </Col>
                </Row>

                {this.renderSearchUsers()}

                {this.renderSearchActions()}
            </div>
        )
    }
}