interface Options {
    url: string,
    body?: object,
    headers?: object
}

export const get = (options: Options) => {
    const { url } = options;
    return fetchRequest(url, {
        ...options,
        method: 'GET',
        headers: {
            ...options.headers,
            'Content-Type': 'application/json'
        }
    });
};

export const post = (options: Options) => {
    const { url } = options;
    const body = JSON.stringify(options?.body);
    return fetchRequest(url, {
        ...options,
        body,
        method: 'POST',
        headers: {
            ...options.headers,
            'Content-Type': 'application/json'
        }
    });
};

/**
 * Request Wrapper with default success/error actions
 */

const fetchRequest = async (url: string, options: object) => {
    const response = await fetch(url, options);
    if (response.ok) {
        return response.json();
    } else {
        const error = await response.json();
        throw Object.assign(error);
    }
};
