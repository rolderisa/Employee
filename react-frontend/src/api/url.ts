const apiUrl: string =
    (import.meta as any).env.DEV ? "http://localhost:4000/api/v1" :
        "https://rtbems-backend.onrender.com/api/v1";

export {
    apiUrl
};