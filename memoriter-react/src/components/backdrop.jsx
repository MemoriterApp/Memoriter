function Backdrop({ onClick }) {

    const backdropStyle = {
        position: 'fixed',
        zIndex: '3',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        width: '100%',
        height: '100%',
        top: '0',
        left: '0'
    }

    return (
        <div style={backdropStyle} onClick={() => onClick()}/>
    );
}

export default Backdrop;