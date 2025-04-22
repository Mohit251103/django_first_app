export const getCookie = (key: string) => {
    const cookie_string = document.cookie;
    const cookies = cookie_string.split("; ");
    for (let cookie of cookies) {
        const [k, value] = cookie.split("=");
        if (k == key) return decodeURIComponent(value);
    }
    return null;
}