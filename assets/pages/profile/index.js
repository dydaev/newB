import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { Action }  from '../../actions';
import REDUCER from '../../consts';

import UserForm from '../../containers/form-user';

import {
  CardBody,
  CardHeader,
  Card,
  Button
} from 'reactstrap';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    if (!this.props.Store.login.isLogin) {
      browserHistory.push('/login');
    }
  }

  componentWillMount() {
    // console.log(this.props);
    if (this.props.Store.profile.user_id) {
      this.props.Dispatcher(Action.update(
        REDUCER.GET_PROFILE_USER,
        { userId: this.props.Store.profile.user_id }
      ));
    } else {
      this.props.Dispatcher(Action.update(REDUCER.STAFF_GET_USER));
    }
  }

  render() {
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
  (store) => ({
    Store: {
      login: store.login,
      profile: store.profile,
    },
  }),
  dispatch => ({ Dispatcher: dispatch })
)(ProfilePage);
