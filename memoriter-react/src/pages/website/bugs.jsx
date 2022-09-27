import WebsiteWrapper from '../../components/website/wrapper/website-wrapper';
import githubIcon from '../../images/icons/github-icon.svg';

const Bugs = () => {
    return (
        <WebsiteWrapper
            title='Bug Report'
            description='If you find any technical issues, you can report them here.'
        >
            <section>
                <h1>Bug Report</h1>
                <p>
                    When reporting a problem, describe everything as precise as possible,
                    as well as how and where the bug occurs.
                    Please report only non device-specific, reproducible issues.
                </p>
                <form>
                    <textarea/>
                    <p>You can also attach up to three images:</p>
                    <button>+</button>
                    <br/>
                    <button type='submit'>Send</button>
                </form>
            </section>
            <section>
                <p>
                    If you find any issues or technical problems, please report them to us.
                </p>
                <p>
                    You can also send us an email regarding the problem to <a>bugs@memoriter.de</a>.
                </p>
                <p>
                    If you are fimiliar with the platform, you can also open an issue on <a href='https://github.com/MemoriterApp/Memoriter/issues' target='_blank' rel='noreferrer'>
                    <img src={githubIcon} alt='github-icon'/>GitHub</a>.
                </p>
            </section>

        </WebsiteWrapper>
    );
}

export default Bugs;