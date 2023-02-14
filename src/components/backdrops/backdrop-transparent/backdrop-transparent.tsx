import { CSSProperties } from 'react';
function BackdropTransparent({ onClick }: { onClick: VoidFunction }) {

    const backdropTransparentStyles: CSSProperties = { //css for transparent backdrop
        position: 'fixed',
        zIndex: '3',
        width: '100%',
        height: '100%',
        top: '0',
        left: '0',
    };

    return (
        <div style={backdropTransparentStyles} onClick={() => onClick()}/>
    );
}

export default BackdropTransparent;