import api from "./Api"


export const createClient = async (data) => {
    try {
        const response = await api.post("/client", data);
        return response.data;
    } catch (error) {
        console.log("Error save client")
    }
}

export const getClients = async () => {
    try {
        const response = await api.get("/clients");
        return response.data;
    } catch (error) {
        console.log("Error get clients")
    }
}

export const deleteClientById = async (id) => {
    try {
        const response = await api.delete(`/client/${id}`);
        return response.data;
    } catch (error) {
        console.log("Error delete client")
    }
}

export const updateClient = async (id, data) => {
    try {
        const response = await api.put(`/client/${id}`, data);
        return response.data;
    } catch (error) {
        console.log("Error update client")
    }
}

export const getClientById = async (id) => {
    try {
        const response = await api.get(`/client/${id}`);
        return response.data;
    } catch (error) {
        console.log("Error get client by id")
    }
}

