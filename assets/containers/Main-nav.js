import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { login, Main }  from '../actions'

import { Nav, Navbar, NavItem, NavLink, NavDropdown, Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';

import MainHeader from './header/';

class Main_nav extends React.Component {
    constructor(props) {
      super(props);
      this.Dispatcher = this.props.Dispatcher;

      if (!props.Store.login.isLogin) {
        this.Dispatcher(login.logged_check());
      }
      this.Dispatcher(Main.getSections());
    }
    render() {
      return (
        <div>
            <MainHeader/>
            <Navbar color="dark"  className="navbar-dark main-nav">
                <Nav navbar>
                  {!this.props.Store.Main.sections ? '' :
                    this.props.Store.Main.sections.map( (sectionName, ind) => {
                      const shortName = sectionName.split(' ')[0];
                      const routPath = shortName;
                      return(
                        <NavItem key={ind}>
                            <NavLink href="#" onClick={() => browserHistory.push('/' + routPath)}>{sectionName}</NavLink>
                        </NavItem>
                      );
                  })}
                </Nav>
            </Navbar>
            <div style={{ marginTop: '5px' }}>{this.props.children}</div>
        </div>
      )
    }
}
export default connect(
    ( store ) => ({ Store: store }),
    dispatch => ({ Dispatcher: dispatch })
)(Main_nav)
