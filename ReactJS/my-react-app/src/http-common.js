import axios from "axios";

export default axios.create({
    baseURL: "http://103.180.237.16/",
    headers:{
        "Content-type":"application/json"
    }
});