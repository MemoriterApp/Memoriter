import './window-size-alert.css';

// On too small screens a warning alert will be displayed, because on very small screens (e.g. very small phones, smart watches etc.) the page does not display correctly.

const WindowSizeAlert = () => {
	return (
	// When the window or display size is to small, a warning will be shown
		<div className='window-size-alert-backdrop'>
			{/* window not wide enough */}
			<div className='window-size-alert'>
				<p className='window-size-alert-heading'>Issue with device:</p>
				<p>Your screen or window is not wide enough to display the page correctly.</p>
				<p>Please rotate your device or resize your window to continue!</p>
			</div>
		</div>
	);
};
export default WindowSizeAlert;