import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {inject} from 'mobx-react';
import Loader from 'intergrip-components/Loader.jsx';
import moment from 'moment';

@inject('DataStore')
export default class MailLog extends Component {
    static TYPE_FROM = 'from';
    static TYPE_TO = 'to';
    static TYPE_CC = 'cc';
    static TYPE_BCC = 'bcc';

    constructor(props) {
        super(props);

        this.state = {
            mailLogs: [],
            loading: true,
        };

        this.props.DataStore
            .MailLogService
            .index()
            .then(this.setMailLogs.bind(this));
    }

    /*******************************************************************************************************************
     ***** METHODS *****************************************************************************************************
     ******************************************************************************************************************/

    setMailLogs(result) {
        this.setState({
            mailLogs: result.data.data.mailLogs,
            loading: false,
        });
    }

    getTo(mailLog) {
        let address = this.getAddressByType(mailLog, MailLog.TYPE_TO);

        return MailLog.getCleanEmailaddress(address);
    }

    getAddressByType(mailLog, type) {
        let address = mailLog.addresses.filter((address) => {
            return address.pivot.type === type;
        });

        return address.length > 0 ? address[0].address : '';
    }

    static getCleanEmailaddress(address) {
        if (address.indexOf('<') !== -1 && address.indexOf('>') !== -1) {
            return address.substring(
                address.lastIndexOf('<') + 1,
                address.lastIndexOf('>')
            );
        }

        return address
    }

    /*******************************************************************************************************************
     ***** RENDER ******************************************************************************************************
     ******************************************************************************************************************/

    renderMailLogs() {
        if (this.state.loading) {
            return <Loader/>
        }

        return (
            <table className="table table-sm">
                <thead>
                <tr>
                    <th>Aan</th>
                    <th colSpan={2}>Onderwerp</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.state.mailLogs.map((mailLog) => {
                        return <tr key={mailLog.id}>
                            <td>{this.getTo(mailLog)}</td>
                            <td>{mailLog.subject.subject}</td>
                            <td>{moment(mailLog.date).format('ll')} om {moment(mailLog.date).format('LT')} uur</td>
                        </tr>
                    })
                }
                </tbody>
            </table>
        );
    }

    render() {
        return (
            <div className={"content"}>
                <h3><FontAwesomeIcon icon={"at"}/> Maillog</h3>
                {
                    this.renderMailLogs()
                }
            </div>
        )
    }
}