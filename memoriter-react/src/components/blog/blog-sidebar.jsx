import '../../styles/blog/blog-sidebar.css';

const BlogSidebar = () => {
    return (
        <aside className='blog-sidebar'>

            <h1 className='blog-sidebar-header'>Blog</h1>

            <p className='blog-sidebar-description'>Thoughts, inspirations and stories by the people creating Memoriter.</p>

            <div className='blog-sidebar-divider'/>

            <ul className='blog-sidebar-topics'>
                <li>Latest</li>
                <li>Company</li>
                <li>Productivity</li>
                <li>Technology</li>
                <li>Miscellaneous</li>
            </ul>
            
        </aside>
    );
}

export default BlogSidebar;