import '../../styles/blog/blog-sidebar.css';

const BlogSidebar = ({ filter, onSetCategory }) => {

    const categories = ['Latest', 'Company', 'Productivity', 'Technology', 'Miscellaneous']; //all categories

    return (
        <aside className='blog-sidebar'>

            <h1 className='blog-sidebar-header'>Blog</h1>

            <p className='blog-sidebar-description'>Thoughts, inspirations and stories by the people creating Memoriter.</p>

            <div className='blog-sidebar-divider'/>

            <ul className='blog-sidebar-topics'>
                {categories.map((category) => ( //gets and displays the categories from the array
                    category === filter? ( //link for the current category is highlighted
                        <li onClick={() => onSetCategory(category)}><strong>{category}</strong></li>
                    ) : (
                        <li onClick={() => onSetCategory(category)}>{category}</li>
                    )
                ))}
            </ul>
            
        </aside>
    );
}

export default BlogSidebar;