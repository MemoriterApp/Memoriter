import Head from '../components/head';
import SignInHeader from '../components/sign-in/sign-in-header';
import SignInMain from '../components/sign-in/sign-in-main';
import WindowSizeAlert from '../components/window-size-alert';

const SignIn = () => {
    return (
        <>
            
            {/*head*/}
            <Head title='Sign In' description='Sign in with your Memoriter account.'/>
            {/*title property is for displaying a custom page title, description is for a custom meta description*/}

            {/*header*/}
            <SignInHeader/>

            {/*container with content*/}
            <SignInMain/>

            {/*alert for too small screens*/}
            <WindowSizeAlert/>

        </>
    );
}

export default SignIn;