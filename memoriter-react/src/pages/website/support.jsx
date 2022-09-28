import WebsiteWrapper from '../../components/website/wrapper/website-wrapper';
import githubIcon from '../../images/icons/github-icon.svg';
import { Link } from 'react-router-dom';

const Support = () => {
    return (
        <WebsiteWrapper
            title='Support'
            description='Here you can find more information if you need help.'
        >

            <h1>Support</h1>

            <section>
                <p>
                    For quick help, please also check out the <Link to='/faq'>FAQ</Link>.
                    If you found a reproducible technical issue, please use the <Link to='/bugs'>bug report</Link> page.
                </p>
                <p>
                    If you need specific help, you can always send an email to <a href='mailto:'>support@memoriter.de</a>.
                </p>
                <p>
                    You can also check out our discussions on <a href='https://github.com/MemoriterApp/Memoriter/' target='_blank' rel='noreferrer'>
                    <img src={githubIcon} alt='github-icon'/>GitHub</a>.
                </p>
            </section>

            <section>
                <h2>Help Guides</h2>
            </section>

        </WebsiteWrapper>
    );
}

export default Support;