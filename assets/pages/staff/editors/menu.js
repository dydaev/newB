import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';

import { Action } from '../../../actions';
import REDUCER from '../../../consts';

class MenuEditor extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.handleChengeName = this.handleChengeName.bind(this);
    this.handleSelectTheme = this.handleSelectTheme.bind(this);
    this.handleSelectSection = this.handleSelectSection.bind(this);
    this.handleUpdateElement = this.handleUpdateElement.bind(this);
    this.handleChengeDescription = this.handleChengeDescription.bind(this);

    props.Dispatcher(Action.update(REDUCER.STAFF_GET_ELEMENTS));
    this.state = {
      dropdownOpen: false,
    };
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
    this.setState({
      selectId: selectId,
    });
    this.props.Dispatcher(Action.update(
      REDUCER.STAFF_GET_SELECTED_ELEMENT,
      { id: selectId }
    ));
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

  handleUpdateElement() {
    const nameInput =  document.querySelector('#forName');
    const descriptionInput = document.querySelector('#forDescription');
    if (nameInput.value &&  descriptionInput.value && this.state.selectId !== undefined) {
      const update = {
        id: this.state.selectId,
        name: nameInput.value,
        description: descriptionInput.value,
      };
      if (this.props.Store.staff.selectedElement.type === 'section')
        this.props.Dispatcher(Action.update(REDUCER.STAFF_UPDATE_SECTION, update));
      else
        this.props.Dispatcher(Action.update(REDUCER.STAFF_UPDATE_THEME, update));
    }
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  render() {
    return (
      <Form>
      <FormGroup>
        <Label for="forElements"><h2>Main menu:</h2></Label>
        <Nav tabs>
          {
            this.props.Store.staff.elements.map((element, ind) => {
              return !element.subElements.length ?
              (
                <NavItem key={ind}>
                  <NavLink
                  href="#"
                  onClick={() => this.handleSelectSection(element.id)}
                  disabled={!element.writeRights}
                  >
                    { element.name }
                  </NavLink>
                </NavItem>
              ) : (
                <Dropdown
                isOpen={this.state.dropdownOpen}
                toggle={this.toggle}
                key={ind}
                >
                  <DropdownToggle nav caret>
                    { element.name }
                  </DropdownToggle>
                  <DropdownMenu>
                    {
                      element.subElements.map((subElement, subInd) =>
                      (
                        <DropdownItem
                        onClick={() => this.handleSelectTheme(subElement.id)}
                        disabled={!subElement.writeRights}
                        key={subInd}
                        >
                          { subElement.name }
                        </DropdownItem>
                      ))
                    }
                  </DropdownMenu>
                </Dropdown>
              );
            })
          }
        </Nav>
      </FormGroup>
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
        <FormGroup tag="fieldset">
          <legend>Date add:</legend>
          <FormGroup disabled>
            <Label>
            {
              this.props.Store.staff.selectedElement.createdAt ?
              this.props.Store.staff.selectedElement.createdAt.date.split('.')[0] :
              ''
            }
            </Label>
          </FormGroup>
        </FormGroup>
        <Button onClick={() => this.handleUpdateElement()}>Update</Button>
        <Button>Cancel</Button>
      </Form>
    );
  }
}

export default connect(
    state => ({ Store: state }),
    dispatch => ({ Dispatcher: dispatch })
)(MenuEditor);
