import React, {Component} from 'react';
import {Container, Row, Col, Input, InputGroup, Button, Form, FormFeedback} from "reactstrap";
import AuthStore from './stores/AuthStore.jsx';
import {observer, Provider} from 'mobx-react';
import DataStore from "./stores/DataStore.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

@observer
export default class Auth extends Component {
    static ROLE_ID_SUPERVISOR = 1;

    constructor(props) {
        super(props);

        this.DataStore = new DataStore();
        this.AuthStore = new AuthStore(this.DataStore);

        this.state = {
            emailaddress: '',
            password: '',
        }
    }

    /*******************************************************************************************************************
     ***** METHODS *****************************************************************************************************
     ******************************************************************************************************************/

    getFormErrorClass() {
        return this.AuthStore.failedAttempts > 0 ? 'd-block' : '';
    }

    getFormError() {
        return this.AuthStore.failedAttemptMessage;
    }

    /*******************************************************************************************************************
     ***** EVENT *******************************************************************************************************
     ******************************************************************************************************************/

    handleEmailaddressChange(event) {
        this.setState({
            emailaddress: event.target.value
        });
    }

    handlePasswordChange(event) {
        this.setState({
            password: event.target.value
        });
    }

    handleLoginSubmit(event) {
        event.preventDefault();

        this.AuthStore.login(this.state.emailaddress, this.state.password, this.props.role);
    }

    /*******************************************************************************************************************
     ***** RENDER ******************************************************************************************************
     ******************************************************************************************************************/

    renderFormError() {
        return (
            <div className={"form-error-container"}>
                <FormFeedback className={"text-right p-0 m-0 " + this.getFormErrorClass()}>
                    {this.getFormError()}
                </FormFeedback>
            </div>
        );
    }

    render() {
        if (this.AuthStore.check()) {
            return <Provider AuthStore={this.AuthStore} DataStore={this.DataStore}>
                {this.props.children}
            </Provider>
        }

        return (
            <Container fluid={true} className="h-100">
                <Row className="h-100 justify-content-center">
                    <Col className="col-6 p-0 align-self-center">
                        <div className="mb-3">
                            <h3>
                                Log in met jouw portal-gegevens
                            </h3>
                        </div>

                        <Form onSubmit={this.handleLoginSubmit.bind(this)} className="needs-validation">
                            <InputGroup className={"mb-2"}>
                                <div className="input-group addon">
                                    <Input onChange={this.handleEmailaddressChange.bind(this)}
                                           placeholder={"E-mailadres"}
                                    />

                                    <div className="input-group-append">
                                        <span className="input-group-text">
                                            <FontAwesomeIcon icon="envelope" />
                                        </span>
                                    </div>
                                </div>
                            </InputGroup>

                            <InputGroup>
                                <div className="input-group addon">
                                    <Input onChange={this.handlePasswordChange.bind(this)}
                                           placeholder={"Wachtwoord"}
                                           type={"password"}
                                    />

                                    <div className="input-group-append">
                                        <span className="input-group-text">
                                            <FontAwesomeIcon icon="lock" />
                                        </span>
                                    </div>
                                </div>
                            </InputGroup>

                            {this.renderFormError()}

                            <InputGroup className={"mt-3"}>
                                <Button color={"primary"} className={"ml-auto"}>
                                    <FontAwesomeIcon icon="sign-in-alt" /> Inloggen
                                </Button>
                            </InputGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}