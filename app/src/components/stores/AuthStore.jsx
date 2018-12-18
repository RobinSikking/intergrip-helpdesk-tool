import {TokenHandler} from "../../helpers/TokenHandler.jsx";
import {autorun, observable, computed, reaction} from 'mobx';
import MailLogService from './../../services/portaal/MailLogService.jsx';
import SearchService from "../../services/helpdesk/SearchService.jsx";
import moment from 'moment';

export default class AuthStore {
    static FAILED_ATTEMPTS_KEY = 'intergrip.helpdesk.failed_attempts';
    static FAILED_ATTEMPTS_TIMESTAMP_KEY = 'intergrip.helpdesk.failed_attempts_timestamp';
    static BLOCK_TIME_SECONDS = 5;

    TokenHandler = null;

    @observable failedAttempts = 0;

    constructor(DataStore) {
        this.DataStore = DataStore;
        this.TokenHandler = TokenHandler;
        this.failedAttempts = AuthStore.getInitialFailedAttempts();

        autorun(() => {
            if (this.check()) {
                this.registerServices();
            }
        });

        reaction(
            () => this.failedAttempts,
            (attempts) => {
                localStorage.setItem(AuthStore.FAILED_ATTEMPTS_KEY, attempts);
                localStorage.setItem(AuthStore.FAILED_ATTEMPTS_TIMESTAMP_KEY, moment().format('x'));
            });
    }

    /*******************************************************************************************************************
     ***** METHODS *****************************************************************************************************
     ******************************************************************************************************************/

    login(emailaddress, password, roleId) {
        let secondsAgo = (moment().format('x') - localStorage.getItem(AuthStore.FAILED_ATTEMPTS_TIMESTAMP_KEY)) / 1000;

        if (secondsAgo > AuthStore.BLOCK_TIME_SECONDS) {
            this.failedAttempts = 0;
        }

        if (!this.canDoMoreAttempts) {
            return false;
        }

        this.TokenHandler
            .init(emailaddress, password, roleId)
            .catch(() => {
                this.failedAttempts++;
            });
    }

    logout() {
        this.TokenHandler.logout();
    }

    check() {
        return !!this.TokenHandler.token;
    }

    registerServices() {
        this.DataStore.registerService(new MailLogService(this.TokenHandler));
        this.DataStore.registerService(new SearchService(this.TokenHandler));
    }

    static getInitialFailedAttempts() {
        return localStorage.getItem(AuthStore.FAILED_ATTEMPTS_KEY) === null
            ? 0
            : parseInt(localStorage.getItem(AuthStore.FAILED_ATTEMPTS_KEY))
    }

    @computed get failedAttemptMessage() {
        if (this.failedAttempts === 0) {
            return '';
        }

        if (this.canDoMoreAttempts) {
            return 'Typefoutje? Ik kan je helaas niet inloggen.';
        }

        return 'Dit gaat wel heel vaak fout... Wacht even 5 minuten.';
    }

    @computed get canDoMoreAttempts() {
        return this.failedAttempts < 5;
    }
}