// @flow
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { Nav, NavItem, NavLink } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';

import { Action } from '../../../actions';
import REDUCER from '../../../consts';

import ControllButtons from '../../../containers/controll-buttons';

class MenuEditor extends React.Component {
  constructor(props) {
    super(props);

    //@ methodBinder
    this.toggle = this.toggle.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleAddTheme = this.handleAddTheme.bind(this);
    this.handleEditTheme = this.handleEditTheme.bind(this);
    this.handleSaveTheme = this.handleSaveTheme.bind(this);
    this.handleAddSection = this.handleAddSection.bind(this);
    this.handleChengeName = this.handleChengeName.bind(this);
    this.handleDeleteTheme = this.handleDeleteTheme.bind(this);
    this.handleUpdateTheme = this.handleUpdateTheme.bind(this);
    this.handleEditSection = this.handleEditSection.bind(this);
    this.handleSaveSection = this.handleSaveSection.bind(this);
    this.handleSelectTheme = this.handleSelectTheme.bind(this);
    this.handleSelectSection = this.handleSelectSection.bind(this);
    this.handleDeleteSection = this.handleDeleteSection.bind(this);
    this.handleUpdateSection =  this.handleUpdateSection.bind(this);
    this.handleChengeDescription = this.handleChengeDescription.bind(this);

    props.Dispatcher(Action.update(REDUCER.STAFF_GET_ELEMENTS));
    this.state = {
      modal: false,
      dropdownOpen: false,
      modalTitle: '',
      saveFunc: () => 0,
    };
  }

  handleUpdateSection() {
    this.props.Dispatcher(Action.update(
      REDUCER.STAFF_ADD_SECTION, {
        name: this.props.Store.staff.selectedElement.name,
        description: this.props.Store.staff.selectedElement.description,
      }
    ));
    this.toggleModal();
  }

  handleAddSection() {
    this.props.Dispatcher(Action.update(
      REDUCER.STAFF_SET_ELEMENT_NAME,
      ''
    ));
    this.props.Dispatcher(Action.update(
      REDUCER.STAFF_SET_ELEMENT_DESCRIPTION,
      ''
    ));
    this.toggleModal(this.handleUpdateSection);
  }

  handleDeleteTheme(selectedId) {
    this.props.Dispatcher(Action.update(
      REDUCER.STAFF_DELETE_THEME,
      { id: selectedId }
    ));
  }

  handleDeleteSection(selectedId) {
    this.props.Dispatcher(Action.update(
      REDUCER.STAFF_DELETE_SECTION,
      { id: selectedId }
    ));
  }

  handleEditTheme(selectedSectionId, selectedThemeId) {
    let theme = '';
    const section = this.props.Store.staff.elements.find(element => {
      theme = element.subElements.find(subEl => subEl.id === selectedThemeId);
      return theme;
    });

    this.setState({
      modalTitle: 'Edit theme ' + theme.name + ' for section ' + section.name,
    });

    this.handleSelectTheme(selectedThemeId);
    this.toggleModal(this.handleSaveTheme);
  }

  handleEditSection(selectId) {
    const section = this.props.Store.staff.elements.find(element => element.id === selectId);

    this.setState({
      modalTitle: 'Edit section ' + section.name,
    });

    this.handleSelectSection(selectId);

    this.toggleModal(this.handleSaveSection);
  }

  handleAddTheme(selectId) {
    this.props.Dispatcher(Action.update(
      REDUCER.STAFF_SET_ELEMENT_NAME,
      ''
    ));
    this.props.Dispatcher(Action.update(
      REDUCER.STAFF_SET_ELEMENT_DESCRIPTION,
      ''
    ));
    const section = this.props.Store.staff.elements.find(element => element.id === selectId);

    this.setState({
      selectId: selectId,
      modalTitle: 'New theme for ' + section.name,
    });
    this.toggleModal(this.handleUpdateTheme);
  }

  handleSelectTheme(selectId) {
    this.setState({
      selectId: selectId,
    });
    this.props.Dispatcher(Action.update(
      REDUCER.STAFF_GET_SELECTED_THEME,
      { id: selectId }
    ));
  }

  handleSelectSection(selectId) {
    this.props.Dispatcher(Action.update(
      REDUCER.STAFF_GET_SELECTED_ELEMENT,
      { id: selectId }
    ));
    this.setState({
      selectId: selectId,
    });
  }

  handleChengeName (e) {
    this.props.Dispatcher(Action.update(
      REDUCER.STAFF_SET_ELEMENT_NAME,
      e.target.value
    ));
  }

  handleChengeDescription (e) {
    this.props.Dispatcher(Action.update(
      REDUCER.STAFF_SET_ELEMENT_DESCRIPTION,
      e.target.value
    ));
  }

  handleUpdateTheme() {
    if (this.state.selectId && this.props.Store.staff.selectedElement.name) {
      this.props.Dispatcher(Action.update(
        REDUCER.STAFF_ADD_THEME,
        {
          sectionId: this.state.selectId,
          name: this.props.Store.staff.selectedElement.name,
          description: this.props.Store.staff.selectedElement.description,
        }
      ));
    }

    this.toggleModal();
  }

  handleSaveTheme() {
    if (this.props.Store.staff.selectedElement.name &&
      this.props.Store.staff.selectedElement.description &&
      this.state.selectId !== undefined) {
      this.props.Dispatcher(Action.update(REDUCER.STAFF_UPDATE_THEME,
        {
          id: this.state.selectId,
          name: this.props.Store.staff.selectedElement.name,
          description: this.props.Store.staff.selectedElement.description,
        }
      ));
    }

    this.toggleModal();
  }

  handleSaveSection() {
    if (this.props.Store.staff.selectedElement.name &&
      this.props.Store.staff.selectedElement.description &&
      this.state.selectId !== undefined) {

      const update = {
        id: this.state.selectId,
        name: this.props.Store.staff.selectedElement.name,
        description: this.props.Store.staff.selectedElement.description,
      };

      this.props.Dispatcher(Action.update(REDUCER.STAFF_UPDATE_SECTION, update));
    }

    this.toggleModal();
  }

  toggleModal(func = () => 0) {
    this.setState({
      modal: !this.state.modal,
      saveFunc: func,
    });
  }

  toggle(menuId) {
    this.setState({
      dropdownOpen: menuId ?
      (this.state.dropdownOpen === menuId ? false : menuId) :
      false,
    });
  }

  render() {
    return (
      <Form>
      <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={this.props.className}>
        <ModalHeader toggle={this.toggleModal}>{ this.state.modalTitle }</ModalHeader>
        <ModalBody>
          <Form>
              <FormGroup>
                <Label for="forName">Name</Label>
                <Input
                type="text"
                name="name"
                id="forName"
                placeholder="Name"
                onChange={ e => this.handleChengeName(e)}
                value={this.props.Store.staff.selectedElement.name}
                />
              </FormGroup>
              <FormGroup>
                <Label for="forDescription">Description</Label>
                <Input
                type="textarea"
                name="text"
                id="forDescription"
                onChange={ e => this.handleChengeDescription(e)}
                value={this.props.Store.staff.selectedElement.description || ''}
                />
              </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.state.saveFunc}>Save</Button>{' '}
          <Button color="secondary" onClick={() => this.toggleModal(()=>0)}>Cancel</Button>
        </ModalFooter>
      </Modal>
      <FormGroup>
        <Label for="forElements">
          <ControllButtons onAdd={() => this.handleAddSection()}>
            <h2>Main menu</h2>
          </ControllButtons>
        </Label>
        <Nav tabs>
          {
            this.props.Store.staff.elements.map((element, ind) =>
              (<ControllButtons key={ind} isVertical
                active={element.writeRights}
                onAdd={() => this.handleAddTheme(element.id)}
                onEdit={() => this.handleEditSection(element.id)}
                onDelete={() => this.handleDeleteSection(element.id)}
                >
                {
                  !element.subElements.length ?
                  (
                      <NavItem>
                          <NavLink
                          href="#"
                          onMouseOver={() => this.handleSelectSection(element.id)}
                          disabled={!element.writeRights}
                          >
                            { element.name }
                          </NavLink>
                      </NavItem>
                  ) : (
                    <Dropdown
                    isOpen={this.state.dropdownOpen === element.id}
                    onMouseOver={() => this.handleSelectSection(element.id)}
                    toggle={() => this.toggle(element.id)}
                    >
                        <DropdownToggle nav caret>
                          { element.name }
                        </DropdownToggle>
                      <DropdownMenu>
                        {
                          element.subElements.map((subElement, subInd) =>
                          (
                            <ControllButtons key={subInd}
                            onEdit={() => this.handleEditTheme(element.id, subElement.id)}
                            onDelete={() => this.handleDeleteTheme(subElement.id)}
                            >
                              <DropdownItem
                              onClick={() => this.handleSelectTheme(subElement.id)}
                              disabled={!subElement.writeRights}
                              >
                                { subElement.name }
                              </DropdownItem>
                            </ControllButtons>
                          ))
                        }
                      </DropdownMenu>
                    </Dropdown>
                  )
                }
              </ControllButtons>)
            )
          }
        </Nav>
      </FormGroup>
        <FormGroup>
          <Label for="forName">Name</Label>
          <p>
            {this.props.Store.staff.selectedElement.name}
          </p>
        </FormGroup>
        <FormGroup>
          <Label for="forDescription">Description</Label>
          <p>
            {this.props.Store.staff.selectedElement.description || ''}
          </p>
        </FormGroup>
        <FormGroup tag="fieldset">
          <Label>Created</Label>
          <FormGroup>
            <p>
            {
              this.props.Store.staff.selectedElement.createdAt ?
              this.props.Store.staff.selectedElement.createdAt.date.split('.')[0] :
              ''
            }
            </p>
          </FormGroup>
        </FormGroup>
      </Form>
    );
  }
}

export default connect(
    state => ({ Store: state }),
    dispatch => ({ Dispatcher: dispatch })
)(MenuEditor);
