import React from 'react';
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { login as actions }  from '../../actions'

import { FormText, FormFeedback, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import classnames from 'classnames';



class UserAddForm extends React.Component {
    constructor(props) {
      super(props);
      this.Dispatcher = props.Dispatcher;

      this.submitForm = this.submitForm.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleRedirectToHome = this.handleRedirectToHome.bind(this);
      this.state = {
        isPassesEquals: '',
        name: '',
        pass: '',
        _pass: '',
        email: ''
      };
    }
    componentDidUpdate(prevProps, prevState) {
      if(this.state.email !== prevState.email) {
        this.Dispatcher(actions.validateEmail({email: this.state.email}))
      }
    }
    handleRedirectToHome(){
      browserHistory.push('/');
    }
    handleChange(e) {
      switch (e.target.id) {
        case 'name':
          this.setState({name: e.target.value});
          break;
        case "email":
          this.setState({email: e.target.value});
          break;
        case 'password':
          this.setState({
            isPassesEquals: e.target.value === this.state._pass ?
              true : false ,
            pass: e.target.value
          });
          break;
        case '_password':
          this.setState({
            isPassesEquals: e.target.value === this.state.pass ?
              true : false  ,
            _pass: e.target.value
          });
          break;
      }
    }
    submitForm() {
      this.Dispatcher(actions.add_new_user({
        _pass: this.state.pass,
        name: this.state.name,
        email: this.state.email
      }));

    }

    render() {
      if(this.props.Store.isLogin) {
        this.handleRedirectToHome();
      }
      let disabledButton = 'disabled'
      if (
        this.props.Store.isEmailValid &&
        this.state.name &&
        this.state.pass === this.state._pass
      ) {
        disabledButton = ''
      }

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
              valid={this.props.Store.isEmailValid}
            />
            <FormText>
            {
              !this.props.Store.isEmailValid ?
              this.props.Store.message :
              ''
            }
            </FormText>
          </FormGroup>
          <FormGroup row>
            <Label for="name" size="lg">Name</Label>
            <Input
              ref={ component => { this.login = component }}
              onChange={ this.handleChange }
              type="text"
              name="name"
              id="name"
              placeholder="name"
              valid={this.state.name}
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
              valid={this.state.isPassesEquals}
            />
          </FormGroup>
          <FormGroup row>
            <Input
              ref={ component => { this.pass = component }}
              onChange={ this.handleChange }
              type="password"
              name="_password"
              id="_password"
              placeholder="confirm password"
            />
          </FormGroup>
          <Button
            className="float-right"
            disabled={!(
              this.props.Store.isEmailValid &&
              this.state.name &&
              this.state.pass === this.state._pass
            )}
            onClick={() => { this.submitForm('login'); }}
          >
            Submit
          </Button>
        </Form>
      );
    }
  }
export default connect(
    ({ login }) => ({ Store: login.login }),
    dispatch => ({Dispatcher: dispatch})
)(UserAddForm)
