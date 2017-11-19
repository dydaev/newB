import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Action } from '../actions';

import { Badge, Button } from 'reactstrap';

import REDUCER from '../consts';

const ControllButtons = props => {
  const addButt = !props.onAdd ?
  '' :
  (
    <li>
      <Button color="success" onClick={() => props.onAdd()} outline>
        <i className="fa fa-plus" aria-hidden="true"></i>
      </Button>
    </li>
  );

  const editButt = !props.onEdit ?
  '' :
  (
    <li>
      <Button color="primary" onClick={() => props.onEdit()} outline>
        <i className="fa fa-pencil-square-o" aria-hidden="false"></i>
      </Button>
    </li>
  );

  const deleteButt = !props.onDelete ?
  '' :
  (
    <li>
      <Button color="danger" onClick={() => props.onDelete()} outline>
        <i className="fa fa-times" aria-hidden="true"></i>
      </Button>
    </li>
  );

  const newsStyle = props.isSubObj ?
  { top: 0 } :
  { bottom: '0px' };

  if (props.Store.login.isLogin) {
    const ObjInD = { type: '', id: '' };//props.children.bbbbbbbbbbbbbbbbbbbbbbbb;
    // props.Dispatcher(Action.update(REDUCER.GET_ACCESS_OBJ, ObjInD));
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
