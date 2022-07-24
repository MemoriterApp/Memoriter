import Head from '../components/head';
import SignInHeader from '../components/sign-in/sign-in-header';
import RegisterMain from '../components/sign-in/register-main';
import WindowSizeAlert from '../components/window-size-alert';

const Register = () => {

    const RegisterMainBottomSpace = { //styles for extra space at the bottom on page scroll
        position: 'absolute',
        left: '0',
        top: '660px',
        width: '100%',
        height: '20px'
    };

    return (
        <>
            
            {/*head*/}
            <Head title='Register' description='Create a new Memoriter account.'/>
            {/*title property is for displaying a custom page title, description is for a custom meta description*/}

            {/*header*/}
            <SignInHeader/>

            {/*container with content*/}
            <RegisterMain/>
            <div style={RegisterMainBottomSpace}/> {/*space at the bottom on page scroll*/}

            {/*alert for too small screens*/}
            <WindowSizeAlert/>

        </>
    );
}

export default Register;