import React from 'react';
import './Rank.css'

const Rank = ({ name, entries }) => {
    return (
        <div>
            <div className='rank'>
                {`${name}, your current entry rank is ...`}
            </div>
            <div className='entries'>
                {entries}
            </div>
        </div>
    );
}

export default Rank;