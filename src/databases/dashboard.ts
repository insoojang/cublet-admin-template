import Database from './database';

class DashboardDatabase extends Database {
    constructor(dbname: string, options?: PouchDB.Configuration.DatabaseConfiguration) {
        super(dbname, options);
    }
}

export default new DashboardDatabase('dashboard');
