require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// default options
app.use(fileUpload({ useTempFiles: true }));

// habilitacion carpeta public
//app.use(express.static(path.resolve(__dirname, '../public')));

//Configuración Global de rutas
app.use(require('./routes/route'));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

mongoose.connect(
        process.env.URL_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }
    )
    .then(() => console.log("Successfully connect to MongoDB."))
    .catch(err => console.error("Connection error", err));

app.listen(process.env.PORT, () => {
    console.log('Escuchando el puerto', process.env.PORT);
});