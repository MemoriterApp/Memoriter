import WebsiteWrapper from '../../components/website/wrapper/website-wrapper';

const Privacy = () => {
    return (
        <WebsiteWrapper
            title='Privacy Policy'
            description='This page contains information regarding how Memoriter uses and processes personal data.'
        >

            {/*main body with text*/}
            <article className='legal-main'>

                <h1>Memoriter Privacy Policy</h1>

                <p><strong>Last Updated: June 8th, 2022</strong></p>
                <p>
                    We are happy that you decided to use our app Memoriter.
                    The collection of user data is crucial for the app to work, therefore the collection of personal data is unavoidable,
                    but we are interested in informing you about for you to feel save while visiting our website and app.
                    In the following, it will be explained how and why we process personal and user data.
                </p>

                <h2>1. Reasons for Collecting Data</h2>
                <p>
                    When using Memoriter, most of the user data is not saved locally on your device,
                    but at a database in order to use the app on different devices and locations.
                    Collecting the user data is therefore important for the app to work,
                    because it will request reading from and writing to a database.
                    Otherwise, no content could be displayed nor changed in the app.
                </p>
                <p>
                    We also might collect data regarding the use of the website/app for analyzing how much the app is used,
                    this is important to provide a fast and stable connection to the online services.
                </p>

                <h2>2. What Data Is Being Collected</h2>
                <p>
                    The user data, such as the flashacards, folders etc. are collected inside of a databse. Furthermore you also need to provide user information like  email address and a password for signing up and logging in,
                    but the password in securely encrypted and cannot be observed.
                </p>
                <p>
                    We might also collect data about accessing the database, like your IP address and time of access to our app and reading and writing from or to the database.
                </p>

                <h2>3. How Personal Data Is Used</h2>
                <p>
                    All user data is stored at a Firebase database, a service provided by Google. For storing data, the privacy policies of Google apply.
                    If you have concerns about how Google might be process the data, the privacy policies can be viewed <a href='https://policies.google.com/u/0/privacy' target='_blank' rel='noreferrer'>here</a>.
                </p>
                <p>
                    All of the data regarding the user such as passwords are being stored inside the firebase authorisation database.
                    All of the user data except passwords, which are securely encrypted, might be visible to the us during development.
                </p>
                <p>
                    We do not share the user data with third parties except for the reasons and parties named above.
                </p>

                <h2>4. Storage Period</h2>
                <p>
                    The data will be stored until the account is deleted. Unfortunately it is curently not possible to delete an account,
                    but it will added later alongside other account management features.
                </p>

                <h2>5. Use of Local Storage</h2>
                <p>
                    This web application uses the local storage of the web browser. This is needed for some features of the application to work correctly.
                    The data saved by the application is only saved locally on your device and is just used for the purpose of functionality.
                    The data can be deleted by the user either manually in the developer tools (for experienced users) or by deleting all website data and settings in the browser history.
                </p>

            </article>
            
        </WebsiteWrapper>
    );
}

export default Privacy;