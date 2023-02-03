import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-calendar-chakraserver-production.up.railway.app",
});

instance.defaults.headers.post["Content-Type"] = "application/json";

export default instance;
