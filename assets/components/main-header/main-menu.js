import React from 'react';
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { login as actions }  from '../../actions'

const MainMenu = ({ Store, Dispatcher }) => {
    let loginLink = Store.isLogin ?
    <a href="#" onClick={() => handleLogout()} className="nav-link" style={{ background: 'red', color: 'white'}} >Hi, {Store.name}</a> :
    <a href="#" onClick={() => browserHistory.push('/login')} className="nav-link">Sign in</a>

    const handleLogout = () => {
      Dispatcher(actions.logout());
    }
    return (
        <ul id="main-menu" className="nav float-right ">
            <li className="nav-item"><a className="nav-link active" href="">home</a></li>
            <li className="nav-line"></li>
            <li className="nav-item"><a className="nav-link" href="">About us</a></li>
            <li className="nav-line"></li>
            <li className="nav-item"><a className="nav-link" href="">contact</a></li>
            <li className="nav-line"></li>
            <li className="nav-item">
                { loginLink }
            </li>
        </ul>
    );
}
export default connect(
    ({ login }) => ({ Store: login.login }),
    dispatch => ({Dispatcher: dispatch})
)(MainMenu)
