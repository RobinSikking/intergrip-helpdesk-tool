import axios from 'axios';

export default class BaseService {
    tokenHandler = null;
    echoServer = null;

    static BLACKLIST_ERROR_MESSAGE = "The token has been blacklisted";
    static EXPIRED_ERROR_MESSAGE = "Token has expired";

    constructor(tokenHandler, echoServer) {
        this.tokenHandler = tokenHandler;
        this.echoServer = echoServer || null;

        this.handleErrors = this.handleErrors.bind(this);
        this.handleToken = this.handleToken.bind(this);
    }

    /*******************************************************************************************************************
     *** METHODS *******************************************************************************************************
     ******************************************************************************************************************/

    refreshToken(headers) {
        if (typeof headers['x-token'] !== 'undefined') {
            this.tokenHandler.setToken(headers['x-token']);
            return true;
        }

        return false;
    }

    getUrl(route, parameters) {
        let resolvedRoute = laroute.route(route, parameters);

        if (resolvedRoute === undefined) {
            throw 'Route "' + route + '" cannot be resolved! Maybe try "php artisan laroute:generate"?';
        }

        return resolvedRoute;
    }

    getHeaders() {
        return {
            headers: {
                Authorization: 'Bearer ' + this.tokenHandler.token,
            }
        };
    }

    /*******************************************************************************************************************
     *** HANDLERS ******************************************************************************************************
     ******************************************************************************************************************/

    handle(axios) {
        return axios
            .then(this.handleToken)
            .catch(this.handleErrors);
    }

    handleToken(response) {
        this.refreshToken(response.headers);

        return Promise.resolve(response);
    }

    handleErrors(error) {
        if (BaseService.isTokenExpiredOrBlacklisted(error)) {
            this.tokenHandler.expired();

            return Promise.reject(error);
        }

        return Promise.reject(error);
    }

    static isTokenExpiredOrBlacklisted(error) {
        return error.response !== undefined
            && (
                error.response.data.errors[0] === BaseService.BLACKLIST_ERROR_MESSAGE
                || error.response.data.errors[0] === BaseService.EXPIRED_ERROR_MESSAGE
            );
    }

    /*******************************************************************************************************************
     *** HTTP METHODS **************************************************************************************************
     ******************************************************************************************************************/
    get(route, parameters) {
        return this.handle(axios.get(this.getUrl(route, parameters), this.getHeaders()));
    }

    delete(route, parameters) {
        return this.handle(axios.delete(this.getUrl(route, parameters), this.getHeaders()));
    }

    put(route, parameters, dataObject) {
        return this.handle(axios.put(this.getUrl(route, parameters), dataObject, this.getHeaders()));
    }

    post(route, parameters, dataObject) {
        return this.handle(axios.post(this.getUrl(route, parameters), dataObject, this.getHeaders()));
    }
}