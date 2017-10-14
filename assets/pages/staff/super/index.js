import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { staff as action }  from '../../../actions'


class SuperPage extends React.Component {
    constructor(props) {
      super(props);

      this.state = {};
    }
    render() {
      // this.props.Dispatcher(action.getUsersList())
      this.props.Dispatcher(action.getUser({userId: 3}))
      return (
          <section className='super-page' style={{ display: 'flex', justifyContent: 'space-between'}}>

          </section>
      )
    }
}

export default connect(
    ({ login, staff }) => ({
      Store: {
        login: login.login,
        staff: staff.staff
      }
    }),
    dispatch => ({Dispatcher: dispatch})
)(SuperPage)
