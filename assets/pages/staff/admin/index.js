import React from 'react';
import { connect } from 'react-redux';
import { increase, decrease } from '../../../actions';

import MenuEditor from '../editors/menu';

import { Action } from '../../../actions';
import REDUCER from '../../../consts';

import { FormGroup, Label, Input, FormText } from 'reactstrap';

class AdminPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <section className='home-page' style={{ display: 'flex', justifyContent: 'space-between' }}>
          
          <MenuEditor/>
        </section>
    );
  }
}

export default connect(
  state => ({ Store: state }),
  dispatch => ({ Dispatcher: dispatch })
)(AdminPage);
