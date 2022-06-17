import '../styles/window-size-alert.css';

//On too small screens a warning alert will be displayed, because on very small screens (e.g. very small phones, smart watches etc.) the page does not display correctly.

const WindowSizeAlert = () => {
    return (
        <div className='window-size-alert-backdrop'> {/*When the window or display size is to small, a warning will be shown*/}
            <div className='window-size-alert'> {/*window not wide enough*/}
                Your screen or window is not wide enough to display the page correctly.
                Please rotate your screen or resize your window.
            </div>

            <div> {/*window not high enough*/}
                
            </div>
        </div>
    );
}

export default WindowSizeAlert;
