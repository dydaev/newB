import React from 'react';

import { connect } from 'react-redux'
import { login as actions }  from '../../actions'

import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import classnames from 'classnames';



class LoginForm extends React.Component {
    constructor(props) {
      super(props);
      const { Dispatcher } = this.props;
      this.Dispatcher = Dispatcher;
      this.submitForm = this.submitForm.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        pass: '',
        email: ''
      };
    }
    handleChange(e) {
      if (this.props.headColor !== 'head_color_blue') {
        this.Dispatcher(actions.change_head_color('head_color_blue'))
      }
      console.log("Login props= ", this.props);
      switch (e.target.id) {
        case 'password':
          this.setState({pass: e.target.value});
          break;
        case "email":
          this.setState({email: e.target.value});
          break;
      }
    }
    submitForm() {
      this.Dispatcher(actions.fatch_login({
        _pass: this.state.pass,
        email: this.state.email
      }));
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
    ({ login }) => ({ Store: login.login }),
    dispatch => ({Dispatcher: dispatch})
)(LoginForm)
