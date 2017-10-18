import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import * as action from '../../../actions'

import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';

class SuperPage extends React.Component {
    constructor(props) {
      super(props);

      props.Dispatcher(action.staff.getUsersList());

      this.toggle = this.toggle.bind(this);
      this.handleAddUser = this.handleAddUser.bind(this);
      this.handleUserEdit = this.handleUserEdit.bind(this);
      this.handleModalSave = this.handleModalSave.bind(this);
      this.handleGenerateRole = this.handleGenerateRole.bind(this);
      this.handleOptionSelect = this.handleOptionSelect.bind(this);
      this.handleChangeInputRole = this.handleChangeInputRole.bind(this);
      this.state = {
        modal: false,
        id: '',
        ind: '',
        roles: [],
        selectedRoleName: '',
        selectedRoleInd:''
      };
      this.inputSection = '';
      this.inputRole = '';
    }

    componentWillUpdate(nextProps, nextState) {
      if(nextState.selectedRoleName !== '') {
        let inputArray = nextState.selectedRoleName.split('_');

        inputArray.forEach( subStr => {
          if(this.props.Store.Main.sections.includes(subStr.toLowerCase())) {
            this.inputSection = subStr.toUpperCase();
          }
          if(Object.keys(this.props.Store.Main.roles).includes(subStr.toLowerCase())) {
            this.inputRole = subStr.toUpperCase();
          }
        })
      }
    }

    toggle(ind, id) {
      if (ind >= 0) {
        console.log("roles->",ind, " = ",this.props.Store.staff.users_list[ind].Roles )
      }
      this.setState({
        selectedRoleName: '',
        selectedRoleInd: '',
        modal: !this.state.modal,
        id: this.state.modal ? '' : id,
        ind: this.state.modal ? '' : ind,
        roles: (ind >= 0) ? this.props.Store.staff.users_list[ind].Roles : []
      });
    }

    handleUserEdit(id) {
      if( id >= 0) {  //TODO dev ( id >= 0 ), prod ( id )
        this.props.Dispatcher(action.profile.setUserId(id));
        browserHistory.push('/profile');
      }
    }

    handleAddUser() {
      alert('new user added')
    }

    handleModalSave() {
      this.toggle();
      alert("Save user " + this.state.id)
    }
    handleOptionSelect(e) {
      this.setState({
        selectedRoleName: this.state.roles[e.target.value],
        selectedRoleInd: e.target.value
      })
    }
    handleChangeInputRole(e) {
      if(this.state.selectedRoleInd >= 0) {
        const newRoles = this.state.roles.map((role, ind) => {
          return parseInt(this.state.selectedRoleInd) === ind ?
          e.target.value.toUpperCase() :
          role
        })
        this.setState({
          selectedRoleName: e.target.value.toUpperCase(),
          roles: newRoles
        })
      } else {
        this.setState({
          selectedRoleName: e.target.value.toUpperCase()
        })
      }
    }
    handleGenerateRole(str) {
      const prefix = 'role';

      this.inputRole = Object.keys(str)[0] === 'role' ?
      str.role.toUpperCase() :
      this.inputRole

      this.inputSection = Object.keys(str)[0] !== 'section' ?
      this.inputSection:
      str.section

      const section = this.inputRole !== 'USER' ? this.inputSection : '';


      const role = prefix +
      (section ? ('_'+section) : '') +
      (this.inputRole ? ('_'+this.inputRole) : '');

      this.setState({
        selectedRoleName: role.toUpperCase(),
        selectedRoleInd: this.state.selectedRoleInd || ''
      })
    }
    render() {
    console.log("PROPS STAFF_SUPER:", this.props);
      return (
          <section className='super-page' style={{ display: 'flex', justifyContent: 'space-between'}}>

          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop={false}>
            <ModalHeader toggle={this.toggle}>Roles setup</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="exampleSelectMulti">Roles</Label>
                <Input
                  type="select"
                  name="selectMulti"
                  id="exampleSelectMulti"
                  onChange={(e)=> this.handleOptionSelect(e)}
                multiple>
                  {
                    this.state.roles.map((role, ind) => {
                      return(
                        <option key={ind} value={ind}>
                          {role}
                        </option>
                      )
                    })
                  }
                </Input>
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  onChange={(e) => this.handleChangeInputRole(e)}
                  value={this.state.selectedRoleName}
                />
              </FormGroup>
              <FormGroup className="inline">
                <FormGroup className="col-lg-6 d-inline-block">
                  <Label for="exSections">Sections</Label>
                  <Input
                    type="select"
                    name="selections"
                    id="exSections"
                    onChange={(e)=> this.handleGenerateRole({section: e.target.value})}
                  >
                  {
                    this.props.Store.Main.sections.map((section, ind) => {
                      return this.inputSection.toUpperCase() === section.toUpperCase() ?
                      (<option key={ind} selected>{section}</option>) :
                      (<option key={ind}>{section}</option>)
                    })
                  }
                  </Input>
                </FormGroup>
                <FormGroup className="col-lg-6 d-inline-block">
                  <Label for="exRoles">Roles</Label>
                  <Input
                    type="select"
                    name="roles"
                    id="exRoles"
                    onChange={(e)=> this.handleGenerateRole({role: e.target.value})}
                  >
                  {Object.keys(this.props.Store.Main.roles).map((role, ind) => {
                    console.log("THIS__",this);
                      return this.inputRole.toUpperCase() === role.toUpperCase() ?
                      (<option key={ind} selected>{role}</option>) :
                      (<option key={ind}>{role}</option>)
                  })}
                  </Input>
                </FormGroup>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.handleModalSave}>Save</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>


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
                    <th scope="row">{ind + 1}</th>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.createdAt.date}</td>
                    <td>
                      <a href="#a" onClick={()=>this.toggle(ind, user.id)}>Roles</a>{' '}
                      <a href="#a" onClick={()=>this.handleUserEdit(user.id)}>edit</a>
                    </td>
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
    ({ Main, login, staff }) => ({
      Store: {
        Main: Main.Main,
        login: login.login,
        staff: staff.staff
      }
    }),
    dispatch => ({Dispatcher: dispatch})
)(SuperPage)
