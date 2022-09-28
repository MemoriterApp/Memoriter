const BugsForm = () => {
    return (
        <section>
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
    );
}

export default BugsForm;