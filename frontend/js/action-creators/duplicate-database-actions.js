import fetch from 'isomorphic-fetch';
import HttpStatus from 'http-status-codes';

import { fetchRecord, resetWorkspace } from '../ui-actions';

import {DUPLICATE_COUNT_SUCCESS, DUPLICATE_COUNT_ERROR, 
  NEXT_DUPLICATE_START, NEXT_DUPLICATE_SUCCESS, NEXT_DUPLICATE_ERROR} from '../constants/action-type-constants';

import {SKIP_PAIR_SUCCESS, SKIP_PAIR_ERROR, MARK_AS_NOT_DUPLICATE_SUCCESS, 
  MARK_AS_NOT_DUPLICATE_ERROR, MARK_AS_MERGED_SUCCESS, MARK_AS_MERGED_ERROR,
  MARK_AS_MERGED_START, MARK_AS_NOT_DUPLICATE_START, SKIP_PAIR_START} from '../constants/action-type-constants';

const APIBasePath = __DEV__ ? 'http://localhost:3001/duplicates': '/duplicates';

export function fetchCount() {

  return function(dispatch) {

    const fetchOptions = {
      method: 'GET',
      credentials: 'include'
    };
   
    return fetch(`${APIBasePath}/pairs/count`, fetchOptions)
      .then(response => {

        if (response.status == HttpStatus.OK) {

          response.text().then(res => {
            if (isNaN(res)) {
              return dispatch(fetchDuplicateCountError('Duplicate count was not a number'));
            }
            dispatch(fetchDuplicateCountSuccess(parseInt(res)));
          });

        } else {
          switch (response.status) {
          case HttpStatus.UNAUTHORIZED: return dispatch(fetchDuplicateCountError('Käyttäjätunnus ja salasana eivät täsmää.'));
          }

          dispatch(fetchDuplicateCountError('Tuplien lukumäärän haussa tapahtui virhe.'));
        }

      }).catch((error) => {
        dispatch(fetchDuplicateCountError('There has been a problem with operation: ' + error.message));
      });
  };
}

function fetchDuplicateCountSuccess(count) {
  return { type: DUPLICATE_COUNT_SUCCESS, count};
}

function fetchDuplicateCountError(error) {
  return { type: DUPLICATE_COUNT_ERROR, error};
}

export function fetchNextPair() {

  return function(dispatch) {

    dispatch(fetchNextPairStart());

    const fetchOptions = {
      method: 'GET',
      credentials: 'include'
    };
   
    return fetch(`${APIBasePath}/pairs/next`, fetchOptions)
      .then(response => {

        if (response.status == HttpStatus.OK) {

          response.json().then(res => {

            dispatch(fetchNextPairSuccess(res));

            dispatch(fetchRecord(res.preferredRecordId, 'SOURCE'));
            dispatch(fetchRecord(res.otherRecordId, 'TARGET'));
            dispatch(fetchCount());

          });

        } else {
          switch (response.status) {
          case HttpStatus.UNAUTHORIZED: return dispatch(fetchNextPairError('Käyttäjätunnus ja salasana eivät täsmää.'));
          }

          dispatch(fetchNextPairError('Seuraavan tietueparin hakemisessa tapahtui virhe.'));
        }

      }).catch((error) => {
        dispatch(fetchNextPairError('There has been a problem with operation: ' + error.message));
      });
  };
}

function fetchNextPairStart() {
  return { type: NEXT_DUPLICATE_START };
}

export function fetchNextPairSuccess(pair) {
  return { type: NEXT_DUPLICATE_SUCCESS, pair};
}

function fetchNextPairError(error) {
  return { type: NEXT_DUPLICATE_ERROR, error};
}

export function skipPair() {

  return function(dispatch, getState) {
    
    const id = getState().getIn(['duplicateDatabase', 'currentPair', 'duplicatePairId']);
    if (id === undefined) {
      return;
    }

    dispatch(skipPairStart());

    const fetchOptions = {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      credentials: 'include'
    };

    return fetch(`${APIBasePath}/pairs/${id}/mark-as-skipped`, fetchOptions)
      .then(response => {
        if (response.status == HttpStatus.OK) {
          dispatch(skipPairSuccess());
          dispatch(resetWorkspace());
          dispatch(fetchNextPair());
        } else {
          dispatch(skipPairError());
        }
      }).catch((error) => dispatch(skipPairError('There has been a problem with operation: ' + error.message)));

  };
}
export function skipPairStart() {
  return { type: SKIP_PAIR_START};
}

export function skipPairSuccess() {
  return { type: SKIP_PAIR_SUCCESS};
}

export function skipPairError(error) {
  return { type: SKIP_PAIR_ERROR, error};
}

export function markAsNotDuplicate() {

  return function(dispatch, getState) {
    const id = getState().getIn(['duplicateDatabase', 'currentPair', 'duplicatePairId']);
    if (id === undefined) {
      return;
    }

    dispatch(markAsNotDuplicateStart());

    const fetchOptions = {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      credentials: 'include'
    };

    return fetch(`${APIBasePath}/pairs/${id}/mark-as-not-duplicates`, fetchOptions)
      .then(response => {
        if (response.status == HttpStatus.OK) {
          dispatch(markAsNotDuplicateSuccess());
          dispatch(resetWorkspace());
          dispatch(fetchNextPair());
        } else {
          dispatch(markAsNotDuplicateError());
        }
      }).catch((error) => dispatch(markAsNotDuplicateError('There has been a problem with operation: ' + error.message)));

  };

}

export function markAsNotDuplicateStart() {
  return { type: MARK_AS_NOT_DUPLICATE_START };
}

export function markAsNotDuplicateSuccess() {
  return { type: MARK_AS_NOT_DUPLICATE_SUCCESS };
}

export function markAsNotDuplicateError(error) {
  return { type: MARK_AS_NOT_DUPLICATE_ERROR, error};
}



export function markAsMerged() {

  return function(dispatch, getState) {

    dispatch(markAsMergedStart());

    const id = getState().getIn(['duplicateDatabase', 'currentPair', 'duplicatePairId']);
    const preferredRecordId = getState().getIn(['duplicateDatabase', 'currentPair', 'preferredRecordId']);
    const otherRecordId = getState().getIn(['duplicateDatabase', 'currentPair', 'otherRecordId']);

    if (id === undefined) {
      return;
    }

    const fetchOptions = {
      method: 'PUT',
      body: JSON.stringify({ 
        preferredRecordId: preferredRecordId,
        otherRecordId: otherRecordId
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      credentials: 'include'
    };

    return fetch(`${APIBasePath}/pairs/${id}/mark-as-merged`, fetchOptions)
      .then(response => {
        if (response.status == HttpStatus.OK) {
          dispatch(markAsMergedSuccess());
        } else {
          dispatch(markAsMergedError());
        }
      }).catch((error) => dispatch(markAsMergedError('There has been a problem with operation: ' + error.message)));


  };
}
export function markAsMergedStart() {
  return { type: MARK_AS_MERGED_START };
}
export function markAsMergedSuccess() {
  return { type: MARK_AS_MERGED_SUCCESS };
}
export function markAsMergedError(error) {
  return { type: MARK_AS_MERGED_ERROR, error};
}

