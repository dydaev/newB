import React from 'react'
import { Link, browserHistory } from 'react-router'

import { Nav, Navbar, NavItem, Button, NavbarBrand, NavLink, NavbarToggler } from 'reactstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default function App({ children }) {
    return (
        <div>
            <div>
        <Navbar color="faded" black>
          <NavbarBrand href="/" className="mr-auto">reactstrap</NavbarBrand>
          <NavbarToggler className="mr-2" />
            <Nav navbar>
              <NavItem>
                <NavLink href="/components/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">Github</NavLink>
              </NavItem>
            </Nav>
        </Navbar>
      </div>
            <div style={{ marginTop: '1.5em' }}>{children}</div>
        </div>
    )
}
//<button onClick={() => browserHistory.push('/foo')}>Go to /foo</button>
/*
 <nav>
 <Navbar color="faded" light>
 <NavItem>
 <NavItem eventKey={1}>world news</NavItem>
 </NavItem>
 <Navbar.Collapse>
 <Nav>
 <LinkContainer to="/world">
 <NavItem eventKey={1}>world news</NavItem>
 </LinkContainer>
 <LinkContainer to="/sport">
 <NavItem eventKey={2}>sports</NavItem>
 </LinkContainer>
 <LinkContainer to="/tech">
 <NavItem eventKey={3}>tech</NavItem>
 </LinkContainer>
 <LinkContainer to="/busines">
 <NavItem eventKey={4}>busines</NavItem>
 </LinkContainer>
 <LinkContainer to="/movies">
 <NavItem eventKey={5}>movies</NavItem>
 </LinkContainer>
 <LinkContainer to="/culture">
 <NavItem eventKey={6}>culture</NavItem>
 </LinkContainer>
 <LinkContainer to="/books">
 <NavItem eventKey={7}>books</NavItem>
 </LinkContainer>
 <LinkContainer to="/blogs">
 <NavItem eventKey={8}>blogs</NavItem>
 </LinkContainer>
 </Nav>
 </Navbar.Collapse>
 </Navbar>
 <Button bsStyle="primary">Primary</Button>
 </nav>
 */