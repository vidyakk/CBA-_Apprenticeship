import axios from "axios";

export default axios.create({
    baseURL: "http://103.180.237.120:4201/api",
    headers:{
        "Content-type":"application/json"
    }
});