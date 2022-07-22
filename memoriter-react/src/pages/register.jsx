import Head from '../components/head';
import SignInHeader from '../components/sign-in/sign-in-header';
import RegisterMain from '../components/sign-in/register-main';
import WindowSizeAlert from '../components/window-size-alert';

const Register = () => {
    return (
        <>
            
            {/*head*/}
            <Head title='Register' description='Create a new Memoriter account.'/>
            {/*title property is for displaying a custom page title, description is for a custom meta description*/}

            {/*header*/}
            <SignInHeader/>

            {/*container with content*/}
            <RegisterMain/>

            {/*alert for too small screens*/}
            <WindowSizeAlert/>

        </>
    );
}

export default Register;