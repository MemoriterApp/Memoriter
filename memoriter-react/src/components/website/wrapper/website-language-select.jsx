const WebsiteLanguageSelect = ({ onAnimation, onCloseLanguageSelect }) => {

    const animationStyles = onAnimation; //gets styles for animation from the parent component

    return (
        <div className='website-language-select' style={animationStyles}>

            <div className='website-language-select-close' onClick={() => onCloseLanguageSelect()}/>
            <p className='website-language-select-title'>Select Language</p>

            <ul className='website-language-select-languages'>
                <li>English</li>
                <li>Deutsch (Beta)</li>
            </ul>
            
        </div>
    );
}

export default WebsiteLanguageSelect;