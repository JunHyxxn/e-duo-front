import { getApiInstance } from "@/api";

const api = getApiInstance();

async function loadCourseLectures(courseId, success, fail) {
  await api.get(`/api/lecture/${courseId}`).then(success).catch(fail);
} 

async function deleteLecture(lectureId, success, fail) {
  await api.delete(`api/lecture/${lectureId}`).then(success).catch(fail);
}

export { loadCourseLectures, deleteLecture }