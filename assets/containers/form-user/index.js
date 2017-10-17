import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { profile as action }  from '../../actions';

import {
  CardBody,
  CardHeader,
  Card,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from 'reactstrap';

class UserForm extends React.Component {
    constructor(props) {
      super(props);

      this.handleSubmit = this.handleSubmit.bind(this);
    }

  handleSubmit() {
    alert("Submit")
  }
  render() {
  return (
    <Form >
      <FormGroup>
        <Label for="exName">Name</Label>
        <Input
          type="text"
          name="name"
          id="exName"
          placeholder="name"
          value={this.props.Store.profile.user.username || ''}
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          type="email"
          name="email"
          id="exampleEmail"
          placeholder="email"
          value={this.props.Store.profile.user.email || ''}
        />
      </FormGroup>
      <FormGroup>
        <Label for="lbCity">City</Label>
        <Input
          type="text"
          name="city"
          id="lbCity"
          placeholder="city"
          value={this.props.Store.profile.user.city || ''}
        />
      </FormGroup>
      <FormGroup>
        <Label for="lbCountry">Country</Label>
        <Input
          type="text"
          name="country"
          id="lbCountry"
          placeholder="country"
          value={this.props.Store.profile.user.country || ''}
        />
      </FormGroup>
      <FormGroup>
        <Label for="lbRoles">Created comments</Label>
        <Input type="select" name="roles" id="lbRoles" multiple>
          <option>Some comment</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="lbAbout">About</Label>
        <Input type="textarea" name="about" id="lbAbout" value={this.props.Store.profile.user.aboutSelf || ''}/>
      </FormGroup>
      <FormGroup>
        <Label for="exampleFile">Avatar</Label>
        <Input type="file" name="file" id="exampleFile" />
        <FormText color="muted">
          You can select you foto for avatar.
        </FormText>
      </FormGroup>
      <FormGroup tag="fieldset">
        <legend>Sex</legend>
        <FormGroup check>
          <Label check>
            <Input type="radio" name="meil" />{' '}
            Meil
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="radio" name="femeil" />{' '}
            Femeil
          </Label>
        </FormGroup>
      </FormGroup>
      <Button onClick={() => this.handleSubmit()}>Submit</Button>
    </Form>
  )
}
}export default connect(
    ( store ) => ({
      Store: {
        profile: {...store.profile.profile},
        login: {...store.login.login}
      }
    }),
    dispatch => ({Dispatcher: dispatch})
)(UserForm)
