import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000/api/"
});

export const getActivities = () => {
    return API.get("activity_view");
};

export const addActivity = (data) => {
    return API.post("activity_view", data);
};

export const getSummary = () => {
    return API.get("activity_summary");
};


export const deleteActivity = (id) => {
    return API.delete(`activity_delete/${id}/`);
    
};
export default API;