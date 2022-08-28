const BlogPostEmbeddedVideo = ({ videoId }) => {

    const embeddedVideoContainer = { //styles for a necessary container creating a 16:9 format
        position: 'relative',
        paddingBottom: '56.25%',
        marginBottom: '10px'
    }

    const embeddedVideoStyles = { //styles for the video itself
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: '10px'
    }

    return (
        <div style={embeddedVideoContainer}>
            <iframe
                style={embeddedVideoStyles}
                src={`https://www.youtube-nocookie.com/embed/${videoId}`} //videoId is the last part of a youtube video link (e.g. WXuK6gekU1Y) 
                title='Embedded Video'
                width='853'
                height='480'
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
            />
        </div>
    );
}

export default BlogPostEmbeddedVideo;