import WebsiteWrapper from '../../components/website/wrapper/website-wrapper';

const Cookies = () => {
    return (
        <WebsiteWrapper
            title='Cookie Policy'
            description='This page contains further information how Memoriter uses cookies.'
        >

            {/*main body with text*/}
            <section className='legal-main'>

                <h1>Memoriter Cookie Policy</h1>

                <p><strong>Last Updated: July 26th, 2022</strong></p>
                <p>
                    Work in Progress.
                </p>

                <h2>Strictly Necessary Cookies</h2>
                <article className='legal-main-table-container'>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Domain</th>
                                <th>Duration</th>
                                <th>Description</th>
                                <th>Provider</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>accepted-cookies</td>
                                <td>app.memoriter.de</td>
                                <td>1 year</td>
                                <td>Saves which cookie options the user has accepted.</td>
                                <td>Memoriter</td>
                            </tr>
                        </tbody>
                    </table>
                </article>

                <h2>Functional Cookies</h2>
                <article className='legal-main-table-container'>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Domain</th>
                                <th>Duration</th>
                                <th>Description</th>
                                <th>Provider</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>theme</td>
                                <td>localStorage</td>
                                <td>Until deletion</td>
                                <td>Saves the current theme (dark or light mode), otherwise it would change back when realoading the page.</td>
                                <td>Memoriter</td>
                            </tr>
                        </tbody>
                    </table>
                </article>
            </section>
            
        </WebsiteWrapper>
    );
}

export default Cookies;