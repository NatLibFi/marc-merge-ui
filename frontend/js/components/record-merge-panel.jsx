import React from 'react';
import { MarcRecordPanel } from './marc-record-panel';
import * as uiActionCreators from '../ui-actions';
import {connect} from 'react-redux';
import '../../styles/components/record-merge-panel.scss';
import { Preloader } from './preloader';
import { ErrorMessagePanel } from './error-message-panel';

export class RecordMergePanel extends React.Component {

  static propTypes = {
    mergedRecord: React.PropTypes.string.isRequired,
    mergedRecordError: React.PropTypes.string,
    mergedRecordState: React.PropTypes.string.isRequired,
    sourceRecord: React.PropTypes.string.isRequired,
    sourceRecordError: React.PropTypes.string,
    sourceRecordState: React.PropTypes.string.isRequired,
    targetRecord: React.PropTypes.string.isRequired,
    targetRecordError: React.PropTypes.string,
    targetRecordState: React.PropTypes.string.isRequired
  }

  getRecord(type) {
    switch(type) {
    case 'SOURCE': return this.props.sourceRecord;
    case 'TARGET': return this.props.targetRecord;
    case 'MERGED': return this.props.mergedRecord;
    }
  }
  getErrorMessage(type) {
    switch(type) {
    case 'SOURCE': return this.props.sourceRecordError;
    case 'TARGET': return this.props.targetRecordError;
    case 'MERGED': return this.props.mergedRecordError;
    }
  }

  getContent(recordState, type) {
    if (recordState === 'LOADING') {
      return <Preloader />;
    }

    if (recordState === 'LOADED') {
      
      return <MarcRecordPanel record={this.getRecord(type)}/>;
    
    }

    if (recordState === 'ERROR') {
      return <ErrorMessagePanel message={this.getErrorMessage(type)} />;
    }
    // empty
    return '';
     
  }

  render() {
    return (
      <div className="row record-merge-panel">
        <div className="col s4">
          <div className="card-panel darken-1 marc-record">
            {this.getContent(this.props.sourceRecordState, 'SOURCE')}
          </div>
        </div>
        <div className="col s4">
          <div className="card-panel darken-1 marc-record">
            {this.getContent(this.props.targetRecordState, 'TARGET')}
          </div>
        </div>
        <div className="col s4">
          <div className="card-panel darken-1 marc-record">
            {this.getContent(this.props.mergedRecordState, 'MERGED')}
          </div>
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    sourceRecord: (state.getIn(['sourceRecord', 'record']) || '').toString(),
    sourceRecordState: state.getIn(['sourceRecord', 'state']),
    targetRecord: (state.getIn(['targetRecord', 'record']) || '').toString(),
    targetRecordState: state.getIn(['targetRecord', 'state']),
    sourceRecordError: state.getIn(['sourceRecord', 'errorMessage']),
    targetRecordError: state.getIn(['targetRecord', 'errorMessage']),
    mergedRecord: (state.getIn(['mergedRecord', 'record']) || '').toString(),
    mergedRecordState: state.getIn(['mergedRecord', 'state'])
  };
}

export const RecordMergePanelContainer = connect(
  mapStateToProps,
  uiActionCreators
)(RecordMergePanel);
