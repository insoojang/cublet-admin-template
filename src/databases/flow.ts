import Database from './database';

class FlowDatabase extends Database {
    constructor(dbname: string, options?: PouchDB.Configuration.DatabaseConfiguration) {
        super(dbname, options);
    }
}

export default new FlowDatabase('flow');
