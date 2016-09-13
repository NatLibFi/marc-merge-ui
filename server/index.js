'use strict';
import express from 'express';
import { logger, expressWinston } from './logger';
import { marcIOController } from './marc-io-controller';
import { readEnvironmentVariable } from './utils';
import { sessionController } from './session-controller';
import cookieParser from 'cookie-parser';

//const NODE_ENV = readEnvironmentVariable('NODE_ENV', 'dev');
const PORT = readEnvironmentVariable('HTTP_PORT', 3001);

const app = express();

app.use(expressWinston);
app.use(cookieParser());


app.get('/err', (req, res) => {
  const error = new Error('What a horrble error');

  logger.log('error', 'Got error', error);

  res.status(500).send(error.message);
});

app.use('/api', marcIOController);
app.use('/session', sessionController);

app.use(express.static('public'));

app.listen(PORT, () => logger.log('info', `Application started on port ${PORT}`));

