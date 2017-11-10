import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Action } from '../actions';

import { Badge, Button } from 'reactstrap';

import REDUCER from '../consts';

const ControllButtons = (props) => {
  let addButt = (
    <li>
    <Button color="success" outline>
    <i className="fa fa-plus" aria-hidden="true"></i>
    </Button>
    </li>
  );
  let editButt = (
    <li>
      <Button color="primary" outline>
        <i className="fa fa-pencil-square-o" aria-hidden="false"></i>
      </Button>
    </li>
  );
  let deleteButt = (
    <li>
      <Button color="danger" outline>
        <i className="fa fa-times" aria-hidden="true"></i>
      </Button>
    </li>
  );
  let newsStyle = {};

  if (props.isNews) {
    let addButt = '';
    let newsStyle = {
      top: 0,
    };
  }

  return (
    <div className="controllButtons">
      <ul style={ newsStyle }>
        {addButt}
        {editButt}
        {deleteButt}
      </ul>
      <div>
        {props.children}
      </div>
    </div>
  );
};

export default connect(
    ({ Main, staff, login }) => ({
      Store: {
        Main: Main,
        login: login,
        staff: staff,
      },
    }),
    dispatch => ({ Dispatcher: dispatch })
)(ControllButtons);
