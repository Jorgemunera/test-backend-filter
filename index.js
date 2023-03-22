const express = require('express');
const cors = require('cors');
const { config } = require('./config/config');
const routerApi = require('./routes');
const { logsError, boomErrorHandler, errorHandler } = require('./middlewares/error.handler');

const app = express();

// Middlewares para manejo de información json y cors
app.use(express.json());
app.use(cors());

// Router
routerApi(app);

// Middlewares globales para manejo de errores
app.use(logsError);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`server corriendo en puerto ${config.port}`);
});
