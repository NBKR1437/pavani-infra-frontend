import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
});

export const getAllProjects = (category) =>
  API.get("/projects", { params: category ? { category } : {} });
export const getProjectBySlug = (slug) => API.get(`/projects/${slug}`);
export const getProjectById = (id) => API.get(`/projects/id/${id}`);
export const createProject = (data) => API.post("/projects", data);
export const updateProject = (id, data) => API.put(`/projects/${id}`, data);
export const deleteProject = (id) => API.delete(`/projects/${id}`);

export const uploadCoverImage = (id, file) => {
  const form = new FormData(); form.append("image", file);
  return API.post(`/projects/${id}/upload-cover`, form);
};
export const uploadLogoImage = (id, file) => {
  const form = new FormData(); form.append("image", file);
  return API.post(`/projects/${id}/upload-logo`, form);
};
export const uploadGalleryImages = (id, files) => {
  const form = new FormData();
  files.forEach((f) => form.append("images", f));
  return API.post(`/projects/${id}/upload-gallery`, form);
};
export const deleteGalleryImage = (id, url) =>
  API.post(`/projects/${id}/delete-gallery-image`, { url });
export const uploadVideo = (id, file) => {
  const form = new FormData(); form.append("video", file);
  return API.post(`/projects/${id}/upload-video`, form);
};
export const uploadBrochure = (id, file) => {
  const form = new FormData(); form.append("pdf", file);
  return API.post(`/projects/${id}/upload-brochure`, form);
};

export const submitEnquiry = (data) => API.post("/enquiries", data);
export const getAllEnquiries = () => API.get("/enquiries");
export const updateEnquiryStatus = (id, status) =>
  API.put(`/enquiries/${id}/status`, { status });
export const deleteEnquiry = (id) => API.delete(`/enquiries/${id}`);

export default API;
