//This custom function is used for simplifying getting and setting cookies in the cookie storage

const cookies = {
    getCookie: (key) => {
        var cookie = document.cookie.match('(^|;)\\s*' + key + '\\s*=\\s*([^;]+)');
        return cookie ? cookie.pop() : '';
    },
    setCookie: (key, value, expires) => {
        document.cookie = `${key}=${value}; expires=${expires}`;
    }
}

export default cookies;