import { getApiInstance } from "@/api";

const api = getApiInstance();

async function loadCourseLectures(courseId, success, fail) {
  await api.get(`/api/lecture/${courseId}`).then(success).catch(fail);
} 

export {loadCourseLectures}