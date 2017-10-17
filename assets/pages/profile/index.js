import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { profile as action }  from '../../actions';

import UserForm from '../../containers/form-user';

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
              <UserForm/>
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
