import axios from 'axios';

export default axios.create({
    baseURL: "http://localhost/eduo",
    headers: {
        "Content-Type": "application/json;charset=utf-8",
    },
});

