import React from 'react';

import { connect } from 'react-redux'
// import { increase, decrease } from '../../actions'

import { CardBody, CardHeader, TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import classnames from 'classnames';

import LoginForm from '../../containers/login-form/';

class LoginPage extends React.Component {
    constructor(props) {
      super(props);

      this.toggle = this.toggle.bind(this);
      this.state = {
        activeTab: '1'
      };
    }
    toggle(tab) {
      if (this.state.activeTab !== tab) {
        this.setState({
          activeTab: tab
        });
      }
    }
    render() {
      return (
        <section id="login" className= "col-sm-12">
          <div className=" col-lg-8 login-firm offset-lg-2">
            <Card>
              <CardHeader className={ this.props.Store.headColor }>{
                this.props.Store.message ?
                `Login page: ${this.props.Store.message}` :
                'Login page'
              }</CardHeader>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '1' })}
                    onClick={() => { this.toggle('1'); }}
                  >
                    Sign in
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '2' })}
                    onClick={() => { this.toggle('2'); }}
                  >
                    Sign up
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <Row className= "justify-content-md-center">
                    <Col sm="9">
                      <LoginForm/>
                    </Col>
                  </Row>
              </TabPane>
              <TabPane tabId="2">
              <Row className= "justify-content-md-center">
                <Col sm="9">

                <CardTitle>Sign up</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button>Go somewhere</Button>

                </Col>
                <Col sm="6">

                </Col>
                </Row>
                </TabPane>
          </TabContent>
          </Card>
          </div>
          </section>
      );
    }
  }
export default connect(
    ({ login }) => ({ Store: login.login }),
    dispatch => ({Dispatcher: dispatch})
)(LoginPage)
