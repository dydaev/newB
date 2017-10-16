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
console.log("PROFILE PROPS-", props);
    }
    componentDidUpdate() {
      if(!this.props.Store.login.isLogin) {
        browserHistory.push('/login');
      }
    }
    componentWillMount() {
      if(this.props.Store.profile.user.id) {
        console.log("User ID is set in profile");
        this.props.Dispatcher(action.getUser(this.props.Store.profile.user.id));
      } else {
        console.log("NO USER ID in profile");
        this.props.Dispatcher(action.getUser());
      }
    }
    render() {
      console.log("PROFILE RENDER props:", this.props);
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
                    value={this.props.Store.profile.user.email || ''}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exName">User name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="exName"
                    placeholder="name"
                    value={this.props.Store.profile.user.username || ''}
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
                  <Label for="lbRoles">Roles</Label>
                  <Input type="select" name="roles" id="lbRoles" multiple>
                    {
                      !this.props.Store.profile.Roles ?
                      '' :
                      Object.values(this.props.Store.profile.Roles).map((role, ind) => {
                        return(
                          <option key={ind}>{role}</option>
                        )
                      })
                    }
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
                <Button>Submit</Button>
              </Form>
            </Card>
          </div>
        </section>
      );
    }
  }
export default connect(
    ( store ) => ({
      Store: {
        profile: {...store.profile.profile},
        login: {...store.login.login}
      }
    }),
    dispatch => ({Dispatcher: dispatch})
)(ProfilePage)
