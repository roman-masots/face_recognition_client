import React from 'react';
import Logo from '../Logo/Logo';
import './Navigation.css';

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
        return (
            <nav className="navigationNav">
                <Logo />
                <p onClick={() => onRouteChange('signout')} className='navigationAction' >Sign Out</p>
            </nav>
        );
    } else {
        return (
            <nav className="navigationNav">
                <Logo className='logo' />
                <div className='navigation'>
                    <p onClick={() => onRouteChange('signin')} className='navigationAction' >Sign In</p>
                    <p onClick={() => onRouteChange('register')} className='navigationAction' >Register</p>
                </div>
            </nav>
        );
    }
}

export default Navigation;