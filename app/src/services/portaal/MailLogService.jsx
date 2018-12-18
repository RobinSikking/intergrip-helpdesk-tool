import BaseService from './../default/BaseService.jsx';

export default class MailLogService extends BaseService {
    constructor(tokenHandler) {
        super(tokenHandler);
    }

    /*******************************************************************************************************************
     ***** METHODS *****************************************************************************************************
     ******************************************************************************************************************/

    index() {
        return this.get('api.portaal.mail.log.index');
    }
}