import axios from 'axios';
import {observable} from 'mobx';

class ITokenHandler {
    static TOKEN_KEY = 'intergrip.helpdesk.token';

    @observable token = null;

    constructor() {
        this.token = localStorage.getItem(ITokenHandler.TOKEN_KEY);
    }

    init(emailaddress, password, roleId) {
        return axios.post(ITokenHandler.getLoginKeyUrl(), {
            emailaddress,
            password,
            claims: {
                role_id: roleId,
            }
        }).then((data) => {
            this.setToken(data.data.access_token);

            return Promise.resolve(data);
        }).catch((error) => {
            return Promise.reject(error);
        });
    }

    logout() {
        this.expired();
    }

    static getLoginKeyUrl() {
        return laroute.route('api.auth.login');
    }

    setToken(token) {
        localStorage.setItem(ITokenHandler.TOKEN_KEY, token);

        this.token = token;
    }

    expired() {
        this.setToken('');
    }
}

let TokenHandler = new ITokenHandler;

export {
    TokenHandler
};