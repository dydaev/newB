import React from 'react';
import { browserHistory } from 'react-router'

export default function MainMenu({ is_auth }) {

    let loginLink = is_auth ?
    <a href="#" className="nav-link">Sign out</a>:
    <a href="#" onClick={() => browserHistory.push('/login')} className="nav-link">Sign in</a>

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