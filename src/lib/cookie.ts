export function getCookie(name: string): string | undefined {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop()?.split(";").shift();
    }
    return undefined;
}

export function getCookieExpires(name: string): number | undefined {
    const token = getCookie(name);
    if (!token) {
        return undefined;
    }

    const expires = localStorage.getItem("myCookieExpires");
    if (!expires) {
        deleteCookie(name);
        return undefined;
    }

    const expiresTime = Number(expires); // milliseconds
    return expiresTime - Date.now(); // còn bao nhiêu ms
}

export function deleteCookie(name: string, path: string = "/") {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
    localStorage.removeItem("myCookieExpires");
}
