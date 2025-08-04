import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3001", // json-server port
  headers: {
    "Content-type": "application/json"
  }
});
