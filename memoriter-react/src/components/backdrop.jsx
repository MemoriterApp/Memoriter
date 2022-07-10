function Backdrop({ onFade, onClick }) {

    const opacity = onFade //variable for possible fade animation (opacity)

    const backdropStyle = { //css for backdrop
        position: 'fixed',
        zIndex: '3',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        width: '100%',
        height: '100%',
        top: '0',
        left: '0',
        opacity: opacity, //dynamic style
        transition: 'opacity 800ms'
    }

    return (
        <div style={backdropStyle} onClick={() => onClick()}/>
    );
}

export default Backdrop;