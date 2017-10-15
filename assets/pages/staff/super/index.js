import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import * as action from '../../../actions'

import { Table } from 'reactstrap';

class SuperPage extends React.Component {
    constructor(props) {
      super(props);

      props.Dispatcher(action.staff.getUsersList())

      this.handleUserEdit = this.handleUserEdit.bind(this)
      this.handleAddUser = this.handleAddUser.bind(this)
      this.state = {};
    }
    handleUserEdit(id) {
      if( id >= 0) {  //TODO dev ( id >= 0 ), prod ( id )
        this.props.Dispatcher(action.profile.setUserId(id))
        browserHistory.push('/profile')
      }
    }
    handleAddUser() {
      alert('new user added')
    }
    render() {
console.log(this.props);
      return (
          <section className='super-page' style={{ display: 'flex', justifyContent: 'space-between'}}>
             <Table striped hover >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Date</th>
                  <th>Settings</th>
                </tr>
              </thead>
              <tbody>
                {this.props.Store.staff.users_list.map( (user, ind) => {
                  return(<tr key={ind}>
                    <th scope="row">{ind}</th>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.createdAt.date}</td>
                    <td><a href="#" onClick={()=>this.handleUserEdit(user.id)}>edit</a></td>
                  </tr>)
                })}
                <tr>
                    <th scope="row"></th>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><a href="#" onClick={()=>this.handleAddUser()}>Add new user</a></td>
                  </tr>
              </tbody>
            </Table>
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
