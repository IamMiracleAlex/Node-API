import "reflect-metadata";
import { createConnection } from "typeorm";
import { Database, Resource } from '@adminjs/typeorm';
import { validate } from 'class-validator'
import AdminJS from 'adminjs';
const AdminJSExpress = require('@adminjs/express')  // DO NOT change

import 'dotenv/config'  // for getting env variables from .env

import app from './app';


const port = process.env.PORT || 3000
const server = process.env.SERVER 
Resource.validate = validate;
AdminJS.registerAdapter({ Database, Resource });



createConnection().then(async connection => {

        const adminJs = new AdminJS({
            databases: [connection],
            rootPath: '/admin',
            assetsCDN: server
        });
        const router = AdminJSExpress.buildRouter(adminJs);

        app.use(adminJs.options.rootPath, router);

    app.listen(port);

    console.log(`Server is running on port ${port}. Goto http://localhost:${port}`);

}).catch(error => console.log(error));
