import React from 'react';
import * as uiActionCreators from '../ui-actions';
import {connect} from 'react-redux';

export class NavBar extends React.Component {
  static propTypes = {
    commitMerge: React.PropTypes.func.isRequired,
    mergeStatus: React.PropTypes.string.isRequired
  }


  disableIfMergeNotPossible() {
    return this.props.mergeStatus === 'COMMIT_MERGE_AVAILABLE' ? '' : 'disabled';
  }

  render() {
    return (
      <div className="navbar-fixed">
        <nav> 
          <div className="nav-wrapper">
            
            <ul id="nav" className="right">
            
              <li><button className="waves-effect waves-light btn" disabled={this.disableIfMergeNotPossible()} onClick={this.props.commitMerge} name="commit_merge">Yhdistä</button></li>
              <li><a className="dropdown-button dropdown-button-menu" href="#!" data-activates="dropdown1"><i className="material-icons">more_vert</i></a></li>
            </ul>

          </div>
        </nav>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    mergeStatus: state.getIn(['mergeStatus', 'status'])
    // prop to be used for disabling the merge button while the action is ongoing
  };
}

export const NavBarContainer = connect(
  mapStateToProps,
  uiActionCreators
)(NavBar);
