// export const BACKEND_URL=process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"
// export const BACKEND_SERVER_URL=process.env.INTERNAL_API_URL || "http://http_backend:3001"
// export const WS_URL=process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8080"
// export const WS_SERVER_URL=process.env.INTERNAL_API_WS_URL || "http://ws_backend:8080"


export const getBaseUrl = () => {
  if (typeof window === "undefined") {
    // We are on the Server! Use the Docker internal name.
    return process.env.INTERNAL_API_URL;
  } else {
    // We are in the Browser! Use the public name.
    return process.env.NEXT_PUBLIC_API_URL;
  }
};

export const getWsUrl = () => {
  if (typeof window === "undefined") {
    // We are on the Server! Use the Docker internal name.
    return process.env.INTERNAL_API_WS_URL;
  } else {
    // We are in the Browser! Use the public name.
    return process.env.NEXT_PUBLIC_API_WS_URL;
  }
};
