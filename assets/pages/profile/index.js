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


class ProfilePage extends React.Component {
    constructor(props) {
      super(props);

      props.Dispatcher(action.getUser(
        props.Store.user_id !== undefined ?
        props.Store.user_id :
        null
      ));
      this.state = {
      };
    }

    render() {
      console.log("Profile this->", this.props);
      return (
        <section id="login" className= "col-sm-12">
          <div className=" col-lg-10 login-firm offset-lg-1">
            <Card>
              <CardHeader >
                Profile
              </CardHeader>
              <Form>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="email"
                    value={this.props.Store.profile.user.email}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exName">User name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="exName"
                    placeholder="name"
                    value={this.props.Store.profile.user.username}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="lbCity">City</Label>
                  <Input
                    type="text"
                    name="city"
                    id="lbCity"
                    placeholder="city"
                    value={this.props.Store.profile.user.city}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="lbCountry">Country</Label>
                  <Input
                    type="text"
                    name="country"
                    id="lbCountry"
                    placeholder="country"
                    value={this.props.Store.profile.user.country}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="lbRoles">Roles</Label>
                  <Input type="select" name="roles" id="lbRoles" multiple>

                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="lbAbout">About</Label>
                  <Input type="textarea" name="about" id="lbAbout" value={this.props.Store.profile.user.aboutSelf}/>
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
                <Button>Submit</Button>
              </Form>
            </Card>
          </div>
        </section>
      );
    }
  }
export default connect(
    ( store ) => ({ Store: store.profile }),
    dispatch => ({Dispatcher: dispatch})
)(ProfilePage)
