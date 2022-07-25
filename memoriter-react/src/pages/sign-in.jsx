import Head from '../components/head';
import SignInHeader from '../components/sign-in/sign-in-header';
import SignInMain from '../components/sign-in/sign-in-main';
import WindowSizeAlert from '../components/window-size-alert';

const SignIn = () => {

    const SignInMainBottomSpace = { //styles for extra space at the bottom on page scroll
        position: 'absolute',
        left: '0',
        top: '660px',
        width: '100%',
        height: '40px'
    }

    return (
        <>

                {/*head*/}
                <Head title='Sign In' description='Sign in with your Memoriter account.'/>
                {/*title property is for displaying a custom page title, description is for a custom meta description*/}
                
                {/*header*/}
                <SignInHeader/>
                
                {/*container with content*/}
                <SignInMain/>
                <div style={SignInMainBottomSpace}/> {/*space at the bottom on page scroll*/}

                {/*alert for too small screens*/}
                <WindowSizeAlert/>

        </>
    );
}

export default SignIn;