import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

const BlogPostInlineCode = ({ children }) => {

    const inlineCodeStyles = { //modifications to pre built syntax highlighter (from a library)
        display: 'inline',
        fontSize: '1.2rem',
        padding: '4px 4px 4px 4px',
        backgroundColor: 'rgba(55, 55, 55, 0.75)',
        borderRadius: '4px'
    };

    return ( //a library for syntax highlighting is used, children refers to the content inside the wrapper
        <SyntaxHighlighter language='jsx' style={atomOneDark} customStyle={inlineCodeStyles} wrapLongLines={true}>
            {children}
        </SyntaxHighlighter>
    );
}

export default BlogPostInlineCode;