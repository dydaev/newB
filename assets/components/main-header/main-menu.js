import React from 'react';
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { login as actions }  from '../../actions'
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';

class MainMenu extends React.Component {
  constructor(props) {
    super(props);
    this.Dispatcher = props.Dispatcher;

    this.toggle = this.toggle.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.state = {
      popoverOpen: false
    };
  }
  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }
  handleLogout() {
    this.Dispatcher(actions.logout());
  }
  render(){
    return (
        <ul id="main-menu" className="nav float-right ">
            <li className="nav-item"><a className="nav-link active" onClick={() => browserHistory.push('/')} href="#">home</a></li>
            <li className="nav-line"></li>
            <li className="nav-item"><a className="nav-link" href="#">About us</a></li>
            <li className="nav-line"></li>
            <li className="nav-item"><a className="nav-link" href="#">contact</a></li>
            <li className="nav-line"></li>
            <li className="nav-item">{
              this.props.Store.isLogin ?
                <div>
                  <a
                    id="main-login-id"
                    href="#"
                    className="nav-link"
                    onClick={this.toggle}
                    style={{ background: 'red', color: 'white'}} >
                      Hi, {this.props.Store.name}
                  </a>
                      <Popover placement="bottom" isOpen={this.state.popoverOpen} target="main-login-id" toggle={this.toggle}>
                      <PopoverHeader>Popover Title</PopoverHeader>
                      <PopoverBody>
                        <ul>
                          <li>
                            <a href="#">Profile</a>
                          </li>
                          <li>
                            <a href="#" onClick={() => this.handleLogout()}>Sign out</a>
                          </li>
                        </ul>
                      </PopoverBody>
                    </Popover>
                </div>:
                <a href="#" onClick={() => browserHistory.push('/login')} className="nav-link">Sign in</a>
            }</li>
        </ul>
    );
  }
}
export default connect(
    ({ login }) => ({ Store: login.login }),
    dispatch => ({Dispatcher: dispatch})
)(MainMenu)
