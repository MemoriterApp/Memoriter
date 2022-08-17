import '../../styles/blog/blog-sidebar.css';
import { Link } from 'react-router-dom';

const BlogSidebar = ({ topic }) => {

    return (
        <aside className='blog-sidebar'>

            <h1 className='blog-sidebar-header'>Blog</h1>

            <p className='blog-sidebar-description'>Thoughts, inspirations and stories by the people creating Memoriter.</p>

            <div className='blog-sidebar-divider'/>

            {/*links to different sub topics*/}
            <ul className='blog-sidebar-topics'>
                {/*the link for the current topic is highlighted*/}
                {topic === 'Latest' ? (<li>
                    <Link className='blog-sidebar-topics-link' to='/blog'><strong>Latest</strong></Link>
                </li>) : (<li>
                    <Link className='blog-sidebar-topics-link' to='/blog'>Latest</Link>
                </li>)}
                {topic === 'Company' ? (<li>
                    <Link className='blog-sidebar-topics-link' to='/blog/topic/company'><strong>Company</strong></Link>
                </li>) : (<li>
                    <Link className='blog-sidebar-topics-link' to='/blog/topic/company'>Company</Link>
                </li>)}
                {topic === 'Productivity' ? (<li>
                    <Link className='blog-sidebar-topics-link' to='/blog/topic/productivity'><strong>Productivity</strong></Link>
                </li>) : (<li>
                    <Link className='blog-sidebar-topics-link' to='/blog/topic/productivity'>Productivity</Link>
                </li>)}
                {topic === 'Technology' ? (<li>
                    <Link className='blog-sidebar-topics-link' to='/blog/topic/technology'><strong>Technology</strong></Link>
                </li>) : (<li>
                    <Link className='blog-sidebar-topics-link' to='/blog/topic/technology'>Technology</Link>
                </li>)}
                {topic === 'Miscellaneous' ? (<li>
                    <Link className='blog-sidebar-topics-link' to='/blog/topic/miscellaneous'><strong>Miscellaneous</strong></Link>
                </li>) : (<li>
                    <Link className='blog-sidebar-topics-link' to='/blog/topic/miscellaneous'>Miscellaneous</Link>
                </li>)}
            </ul>
            
        </aside>
    );
}

export default BlogSidebar;