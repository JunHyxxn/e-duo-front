import axios from "@/api/util/httpUtil";

function listCourses(payload, success, fail) {
    const config = {
        headers: {
            "Content-Type": "text/plain",
            "Authorization": `Bearer ${ payload.accessToken }`
        },
        params: {
            userId: payload.userId,
            role: payload.role,
        },
    };

    axios.get("/api/courses", config)
         .then(success)
         .catch(fail);
}

export { listCourses }