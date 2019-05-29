import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({ imageUrl, box }) => {
    return (
        <div className='center container'>
            <div className='faceDetection'>
                <img id='inputImage' alt='' src={imageUrl} width='500px' height='auto' />
                {
                    box.map(person => {
                        return (
                            <div className='bounding-box' key={person.id} style={{ top: person.topRow, right: person.rightCol, bottom: person.bottomRow, left: person.leftCol }}></div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default FaceRecognition;