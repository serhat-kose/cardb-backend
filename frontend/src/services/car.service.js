import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/cars');
}

const create = data => {
    return httpClient.post("/cars", data);
}

const get = id => {
    return httpClient.get(`/cars/${id}`);
}

const update = data => {
    return httpClient.put('/cars', data);
}

const remove = id => {
    return httpClient.delete(`/cars/${id}`);
}
export default { getAll, create, get, update, remove };