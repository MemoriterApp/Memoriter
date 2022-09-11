//This custom function is used for simplifying getting and setting cookies in the cookie storage

const cookies = {
    getCookie: (key) => { //function to get a cookie value
        const cookie = document.cookie.match('(^|;)\\s*' + key + '\\s*=\\s*([^;]+)');
        return cookie ? cookie.pop() : '';
    },
    setCookie: (key, value, expires) => { //function to set a cookie
        document.cookie = `${key}=${value}; expires=${expires}`;
    }
}

export default cookies;