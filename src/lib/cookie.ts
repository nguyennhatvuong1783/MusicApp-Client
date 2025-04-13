export function getCookie(name: string): string | undefined {
    if (typeof window === "undefined") {
        // Xử lý phía server nếu cần
        return undefined;
    }

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
        const cookieValue = parts.pop()?.split(";").shift();
        return cookieValue;
    }

    return undefined;
}

export function getCookieExpires(name: string): number | undefined {
    if (typeof window === "undefined") {
        // Xử lý phía server nếu cần
        return undefined;
    }

    const token = getCookie(name);
    if (!token) {
        return undefined;
    }
    const expires = localStorage.getItem("myCookieExpires");
    if (!expires) {
        return undefined;
    }
    const expiresDate = new Date(Number(expires));
    return expiresDate.getTime() - Date.now(); // Thời gian còn lại tính bằng milliseconds
}

export function deleteCookie(name: string, path: string = "/") {
    if (typeof window === "undefined") return; // Chỉ chạy phía client

    // Để xóa cookie, ta set expiration date trong quá khứ
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;

    // Nếu có domain, thêm vào (dành cho subdomain)
    const domain = window.location.hostname;
    if (domain !== "localhost") {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}; domain=${domain};`;
    }
}
