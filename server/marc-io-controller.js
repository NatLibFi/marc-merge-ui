import express from 'express';
import cors from 'cors';
import { readEnvironmentVariable, corsOptions } from './utils';
import { logger } from './logger';
import bodyParser from 'body-parser';
import MarcRecord from 'marc-record-js';

import { commitMerge } from './melinda-merge-update';
import { readSessionMiddleware } from './session-controller';

const MelindaClient = require('melinda-api-client');
const alephUrl = readEnvironmentVariable('ALEPH_URL');

const defaultConfig = {
  endpoint: `${alephUrl}/API`,
  user: '',
  password: ''
};

export const marcIOController = express();

marcIOController.use(bodyParser.json());
marcIOController.use(readSessionMiddleware);
marcIOController.set('etag', false);

marcIOController.options('/commit-merge', cors(corsOptions)); // enable pre-flight


marcIOController.get('/:id', cors(corsOptions), (req, res) => {

  const client = new MelindaClient(defaultConfig);

  logger.log('debug', `Loading record ${req.params.id}`);
  client.loadRecord(req.params.id, {handle_deleted: 1}).then((record) => {
    logger.log('debug', `Record ${req.params.id} loaded`);
    res.send(record);
  }).catch(error => {
    logger.log('error', `Error loading record ${req.params.id}`, error);
    res.sendStatus(500);
  }).done();

});

marcIOController.post('/commit-merge', cors(corsOptions), (req, res) => {
  
  const [otherRecord, preferredRecord, mergedRecord] = 
        [req.body.otherRecord, req.body.preferredRecord, req.body.mergedRecord].map(transformToMarcRecord);

  const {username, password} = req.session;

  const clientConfig = { 
    ...defaultConfig,
    user: username,
    password: password
  };
  
  const client = new MelindaClient(clientConfig);

  commitMerge(client, otherRecord, preferredRecord, mergedRecord)
    .then((response) => {
      logger.log('info', `Commit merge successful: ${response}`);
      res.send(response);
    }).catch(error => {
      logger.log('error', 'Commit merge error', error);
      res.sendStatus(500);
    });

});

function transformToMarcRecord(json) {
  return new MarcRecord(json);
}