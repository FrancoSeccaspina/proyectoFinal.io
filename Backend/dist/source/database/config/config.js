"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    development: {
        username: 'root',
        password: '1234',
        database: 'gimnasio_activa',
        host: 'localhost',
        dialect: 'mysql',
    },
    test: {
        username: 'root',
        password: null,
        database: 'database_test',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
    production: {
        username: 'root',
        password: null,
        database: 'database_production',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
};
exports.default = config;
