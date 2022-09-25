import WebsiteWrapper from '../../components/website/wrapper/website-wrapper';

import CurrentRelease from '../../components/website/releases/current-release';
import ReleaseV10 from '../../components/website/releases/release-v1.0';
import ReleaseV11 from '../../components/website/releases/release-v1.1';

import { useState } from 'react';

const Releases = () => {

    const releases = [ //variable with all components with the notes of all older/outdated updates
        <ReleaseV11 key={1.1}/>,
        <ReleaseV10 key={1.0}/>
    ];

    const [loadedReleases, setLoadedReleases] = useState(5); //number of releases shown before clicking on the load more button

    return (
        <WebsiteWrapper
            title='Release Notes'
            description='A list of which features were added or changed in the past.'
        >

            {/*main body*/}
            <section className='releases-main'>

                {/*current version with other style*/}
                <CurrentRelease/>

                {/*older versions, gets data from the releases array, where all components are stored, just gets a part of the array*/}
                {releases.slice(0, loadedReleases)}

                {/*load more button, onClick just adds five to the number of the maximum of shown releases. The button is just shown if necessary.*/}
                {loadedReleases <= releases.length - 1 ? (
                    <button className='releases-main-button' onClick={() => setLoadedReleases(loadedReleases + 5)}>Load More...</button>) : (<div/>)
                }

            </section>
            
        </WebsiteWrapper>
    );
}

export default Releases;