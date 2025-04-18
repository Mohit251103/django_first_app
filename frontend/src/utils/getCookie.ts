export const getCookie = (key: string) => {
    const cookie_string = document.cookie;
    console.log(cookie_string)
    const cookies = cookie_string.split("; ");
    for (let cookie of cookies) {
        const [k, value] = cookie.split("=");
        console.log(k, value);
        if (k == key) return decodeURIComponent(value);
    }
    return null;
}