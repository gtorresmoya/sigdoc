const express = require('express');
const app = express();

app.use(require('./paths/login'));
app.use(require('./paths/usuario'));
app.use(require('./paths/perfil'));
app.use(require('./paths/indice'));
app.use(require('./paths/area'));
app.use(require('./paths/modulo'));
app.use(require('./paths/tipodoc'));
app.use(require('./paths/areatipodoc'));
app.use(require('./paths/configcampo'));
app.use(require('./paths/configtipodoc'));
module.exports = app;