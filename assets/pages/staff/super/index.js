import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Action } from '../../../actions';

import REDUCER from '../../../consts';

import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Form,
  FormGroup
} from 'reactstrap';

class SuperPage extends React.Component {
  constructor(props) {
    super(props);

    props.Dispatcher(Action.update(REDUCER.STAFF_GET_USERS_LIST));

    this.toggle = this.toggle.bind(this);
    this.handleUserEdit = this.handleUserEdit.bind(this);
    this.handleModalSave = this.handleModalSave.bind(this);
    this.handleGenerateRole = this.handleGenerateRole.bind(this);
    this.handleOptionSelect = this.handleOptionSelect.bind(this);
    this.handleChangeInputRole = this.handleChangeInputRole.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.state = {
      name: '',
      modal: false,
      id: '',
      ind: '',
      roles: [],
      selectedRoleName: '',
      selectedRoleInd: '',
    };
    this.inputSection = 'all';
    this.inputRole = '';
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.selectedRoleName !== '') {
      let inputArray = nextState.selectedRoleName.split('_');
      inputArray.forEach(subStr => {
        if (Object.keys(this.props.Store.Main.sections).includes(subStr.toLowerCase())) {
          this.inputSection = subStr.toUpperCase();
        }

        if (Object.keys(this.props.Store.Main.roles).includes(subStr.toLowerCase())) {
          this.inputRole = subStr.toUpperCase();
        }
      });
    }
  }

  toggle(ind, id) {
    if (!this.state.modal) {
      this.inputSection = 'all';
      this.inputRole = '';
    }

    this.setState({
      name: (ind >= 0) ? this.props.Store.staff.users_list[ind].username : '',
      selectedRoleName: '',
      selectedRoleInd: '',
      modal: !this.state.modal,
      id: this.state.modal ? '' : id,
      ind: this.state.modal ? '' : ind,
      roles: (ind >= 0) ? this.props.Store.staff.users_list[ind].Roles : [],
    });
  }

  handleUserEdit(id) {
    if (id) {  //TODO dev ( id >= 0 ), prod ( id )
      this.props.Dispatcher(Action.update(
        REDUCER.PROFILE_SET_USER_ID,
        id
      ));
      browserHistory.push('/profile');
    }
  }

  handleModalSave() {
    this.props.Dispatcher(Action.update(
      REDUCER.STAFF_GET_USER_TO_LIST,
      {
        userId: this.state.id,
        roles: this.state.roles,
      }
    ));
    this.toggle();
  }

  handleOptionSelect(e) {
    this.setState({
      selectedRoleName: this.state.roles[e.target.value],
      selectedRoleInd: e.target.value,
    });
  }

  handleChangeInputRole(e) {
    if (this.state.selectedRoleInd >= 0) {
      const newRoles = this.state.roles.map((role, ind) => {
        return parseInt(this.state.selectedRoleInd) === ind ?
        e.target.value.toUpperCase() : role;
      });
      this.setState({
        selectedRoleName: e.target.value.toUpperCase(),
        roles: newRoles,
      });
    } else {
      this.setState({
        selectedRoleName: e.target.value.toUpperCase(),
      });
    }
  }

  handleGenerateRole(str) {
    const prefix = 'role';

    this.inputRole = Object.keys(str)[0] === 'role' ?
    str.role.toUpperCase() :
    this.inputRole;

    this.inputSection = Object.keys(str)[0] !== 'section' ?
    this.inputSection :
    str.section;

    const section = this.inputRole !== 'USER' ?
    this.inputSection : '';

    const role = prefix +
    ((section !== 'all' && section) ? ('_' + section) : '') +
    (this.inputRole ? ('_' + this.inputRole) : '');

    this.setState({
      selectedRoleName: role.toUpperCase(),
    });
  }

  handleAdd() {
    const newRole = this.state.selectedRoleName;
    if (newRole) {
      this.props.Dispatcher(Action.update(
        REDUCER.STAFF_CHECK_ADDING_ROLE,
        { role: newRole }
      ));
    }
  }

  componentDidUpdate() {
    if (this.props.Store.staff.checkAddingRole) {
      const newRole = this.state.selectedRoleName;
      if (newRole) {
        this.setState({
          roles: Array.from(new Set([...this.state.roles, newRole])),
          selectedRoleName: '',
        });
      }

      this.props.Dispatcher(Action.update(
        REDUCER.STAFF_CHECKED_ADDING_ROLE
      ));
    }
  }

  handleUpdate() {
    if (this.state.selectedRoleInd) {
      const selectedOptionsName = this.state.roles[this.state.selectedRoleInd];
      const rolesArray = this.state.roles.map(role => {
        return role === selectedOptionsName ?
        (role.includes(this.state.selectedRoleName) ? role :
        this.state.selectedRoleName) :
        role;
      });
      this.setState({
        roles: rolesArray,
        selectedRoleName: '',
        selectedRoleInd: '',
      });
    }
  }

  handleDelete() {
    const deleteName = this.state.selectedRoleName;
    if (deleteName !== 'ROLE_USER') {
      this.setState({
        roles: this.state.roles.filter(role => {
          return role !== deleteName;
        }),
      });
    }
  }

  render() {
    return (
      <section
      className='super-page'
      style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Modal
        isOpen={this.state.modal}
        toggle={this.toggle}
        className={this.props.className}
        backdrop={true}>
          <ModalHeader toggle={this.toggle}>
            Setup roles for user
            <split style={{ fontWeight: 'bold', textDecoration: 'underline' }}>
              { this.state.name }
            </split>
          </ModalHeader>
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
                    return (
                      <option key={ind} value={ind}>
                        {role}
                      </option>
                    );
                  })
                }
              </Input>
            </FormGroup>

            <FormGroup className="row justify-content-around">
              <FormGroup className="col-lg-3">
                <Button
                className="col-lg-12"
                color="secondary"
                onClick={this.handleAdd}
                >
                   Add
                </Button>
              </FormGroup>
              <FormGroup className="col-lg-3">
                <Button
                className="col-lg-12"
                color="secondary"
                onClick={this.handleUpdate}
                >
                  Update
                </Button>
              </FormGroup>
              <FormGroup className="col-lg-3">
                <Button
                className="col-lg-12"
                color="secondary"
                onClick={this.handleDelete}
                >
                  Delete
                </Button>
              </FormGroup>
            </FormGroup>

            <FormGroup>
              <Input
                type="text"
                onChange={(e) => this.handleChangeInputRole(e)}
                placeholder="select or enter role"
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
                  onChange={(e)=> this.handleGenerateRole({ section: e.target.value })}
                >
                {
                  Object.keys(this.props.Store.Main.sections).map((section, ind) => {
                    section = section.split('_')[0];
                    const selectOption = this.inputSection.toUpperCase() ?
                    this.inputSection.toUpperCase() : 'all';
                    return selectOption === section.toUpperCase() ?
                    (<option key={ind} selected>{section}</option>) :
                    (<option key={ind}>{section}</option>);
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
                  onChange={(e)=> this.handleGenerateRole({ role: e.target.value })}
                >
                  {
                    !this.props.Store.Main.roles ? '' :
                    Object.keys(this.props.Store.Main.roles).map((role, ind) => {
                      return this.inputRole.toUpperCase() === role.toUpperCase() ?
                      (<option key={ind} selected>{role}</option>) :
                      (<option key={ind}>{role}</option>);
                    })
                  }
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
            {
              this.props.Store.staff.users_list.map((user, ind) => {
                return (<tr key={ind}>
                  <th scope="row">{ind + 1}</th>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.createdAt.date}</td>
                  <td>
                    <a href="#a" onClick={()=>this.toggle(ind, user.id)}>Roles</a>{' '}
                    <a href="#a" onClick={()=>this.handleUserEdit(user.id)}>edit</a>
                  </td>
                </tr>);
              })
            }
            <tr>
                <th scope="row"></th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
          </tbody>
        </Table>
      </section>
    );
  }
}

export default connect(
    ({ Main, staff, login }) => ({
      Store: {
        Main: Main,
        login: login,
        staff: staff,
      },
    }),
    dispatch => ({ Dispatcher: dispatch })
)(SuperPage);
