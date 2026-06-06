const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

const getCsrfToken = () => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; XSRF-TOKEN=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return undefined;
};

export const api = {
    get: async <T>(endpoint: string, headers: HeadersInit = {}): Promise<T> => {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...(token ? { "Authorization": `Bearer ${token}` } : {}),
                ...headers,
            },
        });
        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
        return response.json();
    },
    post: async <T>(endpoint: string, body: unknown, headers: HeadersInit = {}): Promise<T> => {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(token ? { "Authorization": `Bearer ${token}` } : {}),
                ...headers,
            },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            const rawText = await response.text();
            try {
                const err = JSON.parse(rawText);
                throw new Error(err.message || err.error || `API Error: ${response.statusText}`);
            } catch (e) {
                if (e instanceof Error && e.message.startsWith("API Error")) throw e;
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }
        }
        try {
            return response.json(); // Some POSTs might not have body
        } catch {
            return {} as T;
        }
    },
    delete: async <T>(endpoint: string, headers: HeadersInit = {}): Promise<T> => {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                ...(token ? { "Authorization": `Bearer ${token}` } : {}),
                ...headers,
            },
        });
        if (!response.ok) {
            try {
                const err = await response.json();
                throw new Error(err.message || err.error || `API Error: ${response.statusText}`);
            } catch (e) {
                throw new Error(`API Error: ${response.statusText}`);
            }
        }
        try {
            return response.json(); // Some DELETEs callback no content
        } catch {
            return {} as T;
        }
    },
    get url() {
        return API_BASE_URL;
    }
};
