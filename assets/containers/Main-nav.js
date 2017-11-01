import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { Action } from '../actions';
import REDUCER from '../consts';

import {
  Nav,
  Navbar,
  NavItem,
  NavLink,
  Dropdown,
  NavDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem } from 'reactstrap';

import MainHeader from './header/';
import MainMESSAGE from '../components/main-header/main-message';

class MainNav extends React.Component {
  constructor(props) {
    super(props);
    this.Dispatcher = this.props.Dispatcher;

    if (!props.Store.login.isLogin) {
      this.Dispatcher(Action.update(REDUCER.AUTH_IS_LOGGED));
    }

    this.Dispatcher(Action.update(REDUCER.MAIN_UPDATE_SECTIONS));
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  render() {
    return (
      <div>
        <MainMESSAGE />
        <MainHeader/>
        <Navbar color="dark"  className="navbar-dark main-nav">
          <Nav navbar>
            {!this.props.Store.Main.sections ? '' :
            Object.keys(this.props.Store.Main.sections).map((section, ind) => {
                const splitName = sName => {
                  return sName.includes('_') ?
                  sName.split('_').reduceRight((acc, name) => (name + ' ' + acc), '') :
                  sName;
                };

                const routPath = section.split('_')[0];
                let navObject;
                if (this.props.Store.Main.sections[section].length > 0) {
                  navObject = (
                    <NavDropdown  key={ind} isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                      <DropdownToggle nav color="dark" className="navbar-dark">
                        {splitName(section)}
                      </DropdownToggle>
                      <DropdownMenu color="dark" className="dark">
                        {
                          this.props.Store.Main.sections[section].map((theme, themeInd) => {
                            const themePath = theme.split('_')[0];
                            return (
                              <DropdownItem
                              key={themeInd}
                              onClick={() => browserHistory.push('/' + routPath + '/' + themePath)}
                              >
                                {splitName(theme)}
                              </DropdownItem>);
                          })
                        }
                      </DropdownMenu>
                    </NavDropdown>
                  );
                } else {
                  navObject = (
                    <NavItem key={ind}>
                      <NavLink href="#" onClick={() => browserHistory.push('/' + routPath)}>
                        {splitName(section)}
                      </NavLink>
                    </NavItem>
                  );
                }

                return navObject;
              })}
          </Nav>
        </Navbar>
        <div style={{ marginTop: '5px' }}>{this.props.children}</div>
      </div>
    );
  }
}

export default connect(
    (store) => ({ Store: store }),
    dispatch => ({ Dispatcher: dispatch })
)(MainNav);
