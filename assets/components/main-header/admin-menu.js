import React from 'react';
import { connect } from 'react-redux';

import { FormGroup, Label, Input, FormText } from 'reactstrap';

const AdminMenu = ({ Store }) =>
(
  <FormGroup check>
    <Label check>
      <Input type="checkbox" checked={ Store.staff.toggleEditorMode }/>{' '}
      Edit mode
    </Label>
  </FormGroup>
);
export default connect(
    (store) => ({ Store: store }),
    dispatch => ({ Dispatcher: dispatch })
)(AdminMenu);
