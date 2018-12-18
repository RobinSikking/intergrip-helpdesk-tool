import BaseService from './../default/BaseService.jsx';

export default class SearchService extends BaseService {
    constructor(tokenHandler) {
        super(tokenHandler);
    }

    /*******************************************************************************************************************
     ***** METHODS *****************************************************************************************************
     ******************************************************************************************************************/

    index() {
        return this.get('api.helpdesk.search.index');
    }
}