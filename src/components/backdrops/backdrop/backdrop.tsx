import { CSSProperties } from 'react';

function Backdrop({ onFade, onClick }: { onFade?: number, onClick?: VoidFunction }) {

    const opacity = onFade; //variable for possible fade animation (opacity)

    const backdropStyles: CSSProperties = { //css for backdrop
        position: 'fixed',
        zIndex: '3',
        backgroundColor: 'var(--color-backdrop)',
        width: '100%',
        height: '100%',
        top: '0',
        left: '0',
        opacity: opacity, //dynamic style
        transition: 'opacity 800ms'
    };


    return (
        <div style={backdropStyles} onClick={(e) => { e.stopPropagation(); onClick && onClick(); }} />
    );
}

export default Backdrop;