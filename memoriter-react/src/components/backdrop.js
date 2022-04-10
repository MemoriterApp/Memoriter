import React from 'react';

function Backdrop(props) {
    return (
        <div className='backdrop' onClick={props.onClick} >
        </div>
    );
}

export default Backdrop;