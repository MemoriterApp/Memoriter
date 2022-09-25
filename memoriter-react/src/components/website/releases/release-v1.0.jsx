const ReleaseV10 = () => {

    return (
        <article className='old-release'>

            <p style={{color: 'var(--color-font-gray)', textAlign: 'left'}}>June 12th, 2022</p> {/*release date*/}
            
            {/*small introduction*/}
            <h2>Memoriter v1.0</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo diam id ante ultrices, vel pharetra urna vestibulum. Ut mattis congue magna vulputate congue. Vivamus sed dui nec urna lacinia finibus nec in sem. Praesent ex nibh, luctus et tempus ut, facilisis pharetra ante. Sed vel blandit elit, id aliquet mi. Integer et neque imperdiet, varius sem at, sagittis libero. Aenean a porttitor arcu, ut dapibus ante. Donec vestibulum ligula et luctus venenatis. Nulla vulputate mattis sodales. Sed hendrerit ex vitae magna ultricies rutrum. Aliquam sodales, justo nec condimentum vulputate, arcu ipsum efficitur quam, id venenatis velit justo id eros.
            </p>

            {/*larger features and changes*/}
            <h3>Features</h3>
            <p>
                Duis metus ex, luctus eget massa vel, congue placerat risus. Pellentesque eget tincidunt elit. Aenean quis consectetur elit, elementum suscipit turpis. Donec ac neque dolor. Proin consequat varius nisl, eu tristique enim pretium id. Nulla laoreet fringilla erat condimentum tempor. Aliquam et felis magna. Sed pretium pellentesque ligula ut volutpat. Pellentesque pharetra, sem eget consequat varius, arcu metus faucibus nulla, sit amet varius sem sapien eu mi. Quisque nec augue euismod tortor gravida dapibus. Morbi sit amet sapien velit. Nunc bibendum dui at lacus eleifend, non lacinia turpis sagittis. Suspendisse volutpat risus ipsum, ut euismod nisl euismod vitae. Maecenas rutrum neque a laoreet commodo. Vestibulum erat nisl, molestie at eros non, sagittis ullamcorper justo. Curabitur eleifend ex id ligula imperdiet, vitae dictum odio commodo.
            </p>
            <ul>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Lorem ipsum dolor sit amet.</li>
            </ul>
            <p>
                Duis metus ex, luctus eget massa vel, congue placerat risus. Pellentesque eget tincidunt elit. Aenean quis consectetur elit, elementum suscipit turpis.
            </p>

            <p style={{fontFamily: 'var(--font-highlight)', textAlign: 'left', marginBottom: '-32px'}}>
                <br/>
                We hope you enjoyed this update!
                <br/>
                - Memoriter Development Team
            </p>

        </article>
    );
}

export default ReleaseV10;