import React from 'react';

import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { Action }  from '../../actions';
import REDUCER from '../../consts';

import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import classnames from 'classnames';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.submitForm = this.submitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      pass: '',
      email: '',
    };
  }

  handleChange(e) {
    if (this.props.Store.headColor) {
      this.props.Dispatcher(Action.update(REDUCER.AUTH_CHANGE_HEAD_COLOR, ''));
    }

    switch (e.target.id) {
      case 'password':
        this.setState({ pass: e.target.value });
        break;
      case 'email':
        this.setState({ email: e.target.value });
        break;
    }
  }

  submitForm() {
    this.props.Dispatcher(Action.update(
      REDUCER.AUTH_LOGINING,
      {
        _pass: this.state.pass,
        email: this.state.email,
      }));
    this.props.Dispatcher(Action.update(REDUCER.MAIN_UPDATE_SECTIONS));
  }

  render() {
    return (
      <Form>
        <FormGroup row>
          <Label for="email" size="lg">Email</Label>
          <Input
          ref= { component => { this.login = component; }}
          onChange={ this.handleChange }
          type="email"
          name="email"
          id="email"
          placeholder="email"
          />
        </FormGroup>
        <FormGroup row>
          <Label for="password" >Password</Label>
          <Input
          ref={ component => { this.pass = component }}
          onChange={ this.handleChange }
          type="password"
          name="password"
          id="password"
          placeholder="password"
          />
        </FormGroup>
        <Button
        className="float-right"
        onClick={() => { this.submitForm('login'); }}
        >
          Submit
        </Button>
      </Form>
      );
  }
}

export default connect(
    ({ login }) => ({ Store: login }),
    dispatch => ({ Dispatcher: dispatch })
)(LoginForm);
