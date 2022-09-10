import { useSelector } from 'react-redux';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark, atomOneLight } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

const BlogPostCodeBlock = ({ children }) => {

    const codeBlockStyles = { //modifications to pre built syntax highlighter (from a library)
        fontSize: '1.2rem',
        lineHeight: '2rem',
        padding: '12px 16px 12px 16px',
        backgroundColor: 'var(--color-hover)',
        borderRadius: '10px'
    };

    const theme = useSelector((state) => state.theme.value); //current theme (dark or light mode)

    return ( //a library for syntax highlighting is used
        <>
            {theme === 'dark' && <SyntaxHighlighter language={'jsx'} style={atomOneDark} customStyle={codeBlockStyles} wrapLongLines={true}>
                {children.join('\n')} {/*children refers to the content inside the wrapper, .join('\n) creates line breaks, the content needs to be an array*/}
            </SyntaxHighlighter>}
            {theme === 'light' && <SyntaxHighlighter language={'jsx'} style={atomOneLight} customStyle={codeBlockStyles} wrapLongLines={true}>
                {children.join('\n')} {/*children refers to the content inside the wrapper, .join('\n) creates line breaks, the content needs to be an array*/}
            </SyntaxHighlighter>}
        </>
    );
}

export default BlogPostCodeBlock;