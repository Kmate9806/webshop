
import { getRoutes } from "./src/routes";
import { AppDataSource } from "./src/data-source";
import express = require("express");


AppDataSource.initialize().then(async () => {

    const app = express();

    app.use(express.json());

    app.use('/api', getRoutes());

    app.listen(3000, () => {
        console.log('Listening on port 3000 ...');
    });

}).catch(error => console.log(error))