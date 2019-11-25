export const getUrl = () => {
    const { protocol, hostname } = location;
    let { port } = location;
    if (!port) {
        if (protocol === 'https:') {
            port = '443';
        } else {
            port = '80';
        }
    }
    let wsUrl;
    let baseUrl;
    if (protocol === 'https:') {
        wsUrl = 'wss:';
        baseUrl = 'https:';
    } else {
        wsUrl = 'ws:';
        baseUrl = 'http:';
    }
    wsUrl += `//${hostname}:${port}`;
    baseUrl += `//${hostname}:${port}`;
    return {
        wsUrl,
        baseUrl,
    };
}

export const getBaseUrl = () => {
    return getUrl().baseUrl;
}

export const getWsUrl = () => {
    return getUrl().wsUrl;
}
