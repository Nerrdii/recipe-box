const hostname = window && window.location && window.location.hostname;

const backendHost =
  hostname === "herokuapp.com"
    ? "https://infinite-earth-59944.herokuapp.com"
    : "http://localhost:3000";

const API_ROOT = `${backendHost}/api`;

export default API_ROOT;
