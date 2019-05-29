import React from 'react';
import Tilt from 'react-tilt';
import face from './face.png'
import './Logo.css'

const Logo = () => {
    return (
        <div>
            <Tilt className="Tilt" options={{ max: 70 }} style={{ height: 120, width: 120 }} >
                <div className="Tilt-inner"><img alt='logo' src={face} /></div>
            </Tilt>
        </div>
    );
}

export default Logo;