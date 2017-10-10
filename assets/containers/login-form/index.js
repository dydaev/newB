import React from 'react';

import { connect } from 'react-redux'
import { login as actions }  from '../../actions'

import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import classnames from 'classnames';

class LoginForm extends React.Component {
    constructor(props) {
      super(props);

      this.submitForm = this.submitForm.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        login: '',
        pass: ''
      };
    }
    handleChange(e) {
      switch (e.target.id) {
        case 'password':
          this.setState({pass: e.target.value});
          break;
        case "email":
          this.setState({login: e.target.value});
          break;
      }
    }
    submitForm() {
      const { Dispatcher } = this.props;
console.log("props in loginForm:", this.props);
      Dispatcher(actions.login({pass: this.state.pass, login: this.state.login}));
    }

    render() {
      return (
        <Form>
          <FormGroup row>
            <Label for="email" size="lg">Email</Label>
            <Input
              ref={ component => { this.login = component }}
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
          <Button className="float-right" onClick={() => { this.submitForm('login'); }} >Submit</Button>
        </Form>
      );
    }
  }
export default connect(
    state => ({ Store: state }),
    dispatch => ({Dispatcher: dispatch})
)(LoginForm)
