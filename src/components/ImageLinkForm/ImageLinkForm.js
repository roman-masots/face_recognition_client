import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonClick, onEnterKeyClick }) => {
    return (
        <div>
            <p className='textParagraph'>
                This Magic Brain will detect faces in your pictures. Try it out now!
            </p>
            <div className='center'>
                <div className='center imageLinkForm'>
                    <input className='formInput center' type='text' onChange={onInputChange} onKeyPress={onEnterKeyClick} />
                    <button className='detectBtn' onClick={onButtonClick}>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;